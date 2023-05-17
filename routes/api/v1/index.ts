const API_DESCRIPTION =
  "\
Perseus Billion Stars API is observerly's Fast API \
of stars, galaxies and other astronomical bodies, \
adhering to the OpenAAS standard.\
"

const API_NAME = 'Perseus Billion Stars API by observerly'

const API_V1_STR = '/api/v1'

export default eventHandler(() => {
  return {
    description: API_DESCRIPTION,
    endpoint: API_V1_STR,
    name: API_NAME
  }
})
