import jwt from 'jsonwebtoken'
import axios from 'axios'
export const createToken = (user)=>{
    return jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '20d',
        }
      );
}

export const emailResolver = (email)=>{
    const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }
  return email
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token Found' });
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
}
export const totalPriceCalculator = (items)=>{
  const total = items.reduce((accumulator, item) => {
    const product = item.base_price * item.quantity
    return accumulator + product
  }, 0)
  return total

}
const calculateDistance = (lat1,lon1, lat2, lon2)=> {

  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

// Helper function to convert degrees to radians
const toRadians =(degrees)=> {
  return degrees * (Math.PI / 180);
}
const geocodeAddress = async(address)=>{
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const encodedAddress = encodeURIComponent(address);

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      const { lat, lng } = result.geometry.location;
      return { latitude: lat, longitude: lng };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  return { latitude: null, longitude: null };
}
const calculateShortestDistance = async(address)=> {
  const dispatchCenters = [
    { city: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
    { city: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
    { city: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
    // Add more dispatch centers as needed
  ];

  // Check if the provided address is valid
  const { latitude, longitude } = await geocodeAddress(address);
  if (!latitude || !longitude) {
    return 'Invalid';
  }

  // Calculate distances to each dispatch center
  const distances = dispatchCenters.map((center) => {
    const distance = calculateDistance(latitude, longitude, center.latitude, center.longitude);
    return { city: center.city, distance };
  })
  const shortestDistance = Math.min(...distances.map((center) => center.distance));
  const closestCenter = distances.find((center) => center.distance === shortestDistance);
  console.log("C",closestCenter)

  if (closestCenter) {
    return 10
  } else {
    return 'Invalid';
  }
}
export const shippingPriceCalculator = (address)=>{
  console.log("s",calculateShortestDistance(address))
  return 10*calculateShortestDistance(address)
}
