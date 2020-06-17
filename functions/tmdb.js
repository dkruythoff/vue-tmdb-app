const axios = require('axios').default;

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};
const baseURL = 'https://api.themoviedb.org/3/'
const api_key = process.env.TMDB_API_KEY

exports.handler = async function (event, context) {

  // CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode,
      headers
    }
  }

  // API key check
  if (!api_key) {
    return {
      statusCode: 500,
      headers,
      body: 'No key found'
    }
  }

  const { path: fullPath, queryStringParameters } = event
  const path = fullPath.replace('/.netlify/functions/tmdb', '')

  // Path check
  if (!path || path === '/') {
    return {
      statusCode: 500,
      headers,
      body: 'No path given'
    }
  }

  const body = await axios({
    baseURL,
    url: path,
    params: {
      ...(queryStringParameters || {}),
      api_key
    }
  })
    .then(({ data }) => data)
    .catch((err) => console.log(err.message))

  return {
    statusCode,
    headers: { ...headers, 'Content-type': 'application/json' },
    body
  }
}