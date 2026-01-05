/**
 * Geographic utilities for converting GeoJSON track data to SVG coordinates
 * and positioning annotations along the track polyline.
 */

export interface Point {
  x: number;
  y: number;
}

export interface GeoBounds {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

export interface ViewBox {
  width: number;
  height: number;
  padding: number; // Percentage of viewBox to use as padding (0-1)
}

/**
 * Project a lat/lon coordinate to SVG space
 * @param lat Latitude
 * @param lon Longitude
 * @param bounds Geographic bounds of the track
 * @param viewBox SVG viewBox dimensions
 * @returns Point in SVG coordinates
 */
export function projectLatLonToSVG(
  lat: number,
  lon: number,
  bounds: GeoBounds,
  viewBox: ViewBox
): Point {
  // Calculate normalized position (0-1) within bounds
  const normalizedX = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon);
  const normalizedY = (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);

  // Apply padding to keep track from edges
  const paddingPx = viewBox.width * viewBox.padding;
  const usableWidth = viewBox.width - 2 * paddingPx;
  const usableHeight = viewBox.height - 2 * paddingPx;

  // Convert to SVG coordinates
  // Note: SVG y-axis increases downward, so we flip the y coordinate
  const x = paddingPx + normalizedX * usableWidth;
  const y = paddingPx + (1 - normalizedY) * usableHeight; // Flip Y axis

  return { x, y };
}

/**
 * Extract coordinates from GeoJSON and build a polyline in SVG space
 * @param geojson GeoJSON FeatureCollection
 * @returns Array of points forming the track polyline
 */
export function buildPolylineFromGeoJSON(geojson: any): Point[] {
  try {
    // Extract the feature (assumes first feature is the track)
    const feature = geojson.features?.[0];
    if (!feature || feature.geometry.type !== 'LineString') {
      console.error('Invalid GeoJSON: expected LineString geometry');
      return [];
    }

    // Get coordinates array (format: [lon, lat])
    const coordinates: number[][] = feature.geometry.coordinates;
    if (!coordinates || coordinates.length === 0) {
      console.error('No coordinates found in GeoJSON');
      return [];
    }

    // Calculate bounds from the data
    const bounds: GeoBounds = {
      minLat: Infinity,
      maxLat: -Infinity,
      minLon: Infinity,
      maxLon: -Infinity,
    };

    coordinates.forEach(([lon, lat]) => {
      bounds.minLat = Math.min(bounds.minLat, lat);
      bounds.maxLat = Math.max(bounds.maxLat, lat);
      bounds.minLon = Math.min(bounds.minLon, lon);
      bounds.maxLon = Math.max(bounds.maxLon, lon);
    });

    // Define SVG viewBox (400x240 to match track map component)
    const viewBox: ViewBox = {
      width: 400,
      height: 240,
      padding: 0.05, // 5% padding
    };

    // Project all coordinates to SVG space
    const polyline = coordinates.map(([lon, lat]) =>
      projectLatLonToSVG(lat, lon, bounds, viewBox)
    );

    return polyline;
  } catch (error) {
    console.error('Error building polyline from GeoJSON:', error);
    return [];
  }
}

/**
 * Calculate cumulative distances along polyline segments
 * @param polyline Array of points
 * @returns Array of cumulative distances
 */
function calculateCumulativeDistances(polyline: Point[]): number[] {
  const distances: number[] = [0];
  let total = 0;

  for (let i = 1; i < polyline.length; i++) {
    const dx = polyline[i].x - polyline[i - 1].x;
    const dy = polyline[i].y - polyline[i - 1].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    total += dist;
    distances.push(total);
  }

  return distances;
}

/**
 * Get a point along the polyline at a given normalized position
 * @param pos Normalized position along track (0-1)
 * @param polyline Array of points forming the track
 * @returns Point at the specified position
 */
export function pointForPos(pos: number, polyline: Point[]): Point {
  if (polyline.length === 0) {
    return { x: 200, y: 120 }; // Fallback to center
  }

  if (polyline.length === 1) {
    return polyline[0];
  }

  // Clamp pos to valid range
  pos = Math.max(0, Math.min(1, pos));

  // Calculate cumulative distances
  const distances = calculateCumulativeDistances(polyline);
  const totalDistance = distances[distances.length - 1];

  // Find target distance along track
  const targetDistance = pos * totalDistance;

  // Find the segment containing the target distance
  for (let i = 1; i < distances.length; i++) {
    if (targetDistance <= distances[i]) {
      // Interpolate between points i-1 and i
      const segmentStart = distances[i - 1];
      const segmentEnd = distances[i];
      const segmentLength = segmentEnd - segmentStart;

      if (segmentLength === 0) {
        return polyline[i - 1];
      }

      const t = (targetDistance - segmentStart) / segmentLength;

      return {
        x: polyline[i - 1].x + t * (polyline[i].x - polyline[i - 1].x),
        y: polyline[i - 1].y + t * (polyline[i].y - polyline[i - 1].y),
      };
    }
  }

  // If we reach here, return the last point
  return polyline[polyline.length - 1];
}

/**
 * Find the nearest point on the polyline to a given click position
 * @param click Click coordinates in SVG space
 * @param polyline Array of points forming the track
 * @returns Normalized position (0-1) and nearest point
 */
export function nearestPointOnPolyline(
  click: Point,
  polyline: Point[]
): { pos: number; point: Point } {
  if (polyline.length === 0) {
    return { pos: 0, point: { x: 200, y: 120 } };
  }

  if (polyline.length === 1) {
    return { pos: 0, point: polyline[0] };
  }

  const distances = calculateCumulativeDistances(polyline);
  const totalDistance = distances[distances.length - 1];

  let minDist = Infinity;
  let bestPos = 0;
  let bestPoint = polyline[0];

  // Check each segment
  for (let i = 0; i < polyline.length - 1; i++) {
    const p1 = polyline[i];
    const p2 = polyline[i + 1];

    // Vector from p1 to p2
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const segmentLengthSq = dx * dx + dy * dy;

    if (segmentLengthSq === 0) {
      // Degenerate segment, just check distance to p1
      const dist = Math.sqrt(
        (click.x - p1.x) ** 2 + (click.y - p1.y) ** 2
      );
      if (dist < minDist) {
        minDist = dist;
        bestPoint = p1;
        bestPos = distances[i] / totalDistance;
      }
      continue;
    }

    // Project click onto line segment
    const t = Math.max(
      0,
      Math.min(
        1,
        ((click.x - p1.x) * dx + (click.y - p1.y) * dy) / segmentLengthSq
      )
    );

    // Find nearest point on segment
    const nearestX = p1.x + t * dx;
    const nearestY = p1.y + t * dy;
    const dist = Math.sqrt(
      (click.x - nearestX) ** 2 + (click.y - nearestY) ** 2
    );

    if (dist < minDist) {
      minDist = dist;
      bestPoint = { x: nearestX, y: nearestY };

      // Calculate position along entire track
      const segmentDistance = Math.sqrt(segmentLengthSq);
      const distanceAlongTrack = distances[i] + t * segmentDistance;
      bestPos = distanceAlongTrack / totalDistance;
    }
  }

  // Clamp position to valid range
  bestPos = Math.max(0, Math.min(1, bestPos));

  return { pos: bestPos, point: bestPoint };
}
