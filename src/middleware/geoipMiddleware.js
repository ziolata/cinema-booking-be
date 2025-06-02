import geoip from 'geoip-lite';

function getClientIp(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }

  const remoteAddr = req.socket.remoteAddress;
  if (remoteAddr?.startsWith('::ffff:')) {
    return remoteAddr.replace('::ffff:', '');
  }

  return remoteAddr;
}

export function geoipVNOnly(req, res, next) {
  const ip = getClientIp(req);
  const geo = geoip.lookup(ip);

  if (!geo) {
    const isLocal =
      ip === '127.0.0.1' ||
      ip === '::1' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.');
    if (isLocal) return next();

    console.warn(`Blocked IP: ${ip} | Reason: GeoIP not found`);
    return res.status(403).send('403 Forbidden: Không xác định được vị trí IP');
  }

  if (geo.country !== 'VN') {
    console.warn(`Blocked IP: ${ip} | Country: ${geo.country}`);
    return res.status(403).send('403 Forbidden: Chỉ cho phép truy cập từ Việt Nam');
  }

  next();
}
