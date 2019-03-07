const errorHandler = (error) => {
  let errorMsg
  let statusCode
  if (error instanceof TypeError || error instanceof SyntaxError) {
    errorMsg = error.stack
    statusCode = 500
  } else if (error.response) {
    errorMsg = JSON.stringify(error.response.data)
    statusCode = error.response.status
  } else {
    errorMsg = error.statusMessage
    statusCode = error.statusCode
  }

  return {
    error: {
      status: statusCode,
      message: errorMsg
    }
  }
}

module.exports = errorHandler
