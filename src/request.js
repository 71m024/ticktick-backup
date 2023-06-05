const request = (path, requestOptions) => (
   fetch(`https://api.ticktick.com${path}`, requestOptions)
    .then(response => response.json())
    .then(response => response.error
      ? (() => {throw new Error(`${response.error}: ${response.error_description}`)})()
      : response
    )
)

export default request
