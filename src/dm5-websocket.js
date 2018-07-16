import dm5 from 'dm5'

var config = dm5.restClient.getWebsocketConfig()

/**
 * A constructor for a WebSocket connection.
 *
 * The URL to connect to is determined automatically, based on the server-side `dm4.websockets.url` config property.
 * The created WebSocket auto-reconnects once timed out by the browser (usually every 5 minutes).
 * WebSocket messages are expected to be JSON. Serialization/Deserialization performs automatically.
 *
 * Properties of a DM5WebSocket instance:
 *   `url` - url of the WebSocket server
 *   `ws`  - the native WebSocket object
 *
 * @param   pluginUri
 *              the URI of the calling plugin.
 * @param   messageProcessor
 *              the function that processes incoming messages.
 *              One argument is passed: the message pushed by the server (a deserialzed JSON object).
 *
 * @return  The created WebSocket object, wrapped as a DM5 proprietary object.
 *          This object provides a "send_message" function which takes 1 argument: the message to be
 *          sent to the server. The argument will be automatically serialized as a JSON object.
 */
export default class DM5WebSocket {

  constructor (pluginUri, messageProcessor) {
    this.pluginUri = pluginUri
    this.messageProcessor = messageProcessor
    config.then(config => {
      this.url = config['dm4.websockets.url']
      console.log('[DM5] CONFIG: the WebSocket server is reachable at', this.url)
      this._setupWebsocket()
    })
  }

  send_message (message) {
    this.ws.send(JSON.stringify(message))
  }

  _setupWebsocket () {
    this.ws = new window.WebSocket(this.url, this.pluginUri)

    this.ws.onopen = e => {
      console.log('[DM5] Opening WebSocket connection to', e.target.url)
    }

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data)
      console.log('[DM5] Message received', message)
      this.messageProcessor(message)
    }

    this.ws.onclose = e => {
      console.log(`[DM5] Closing WebSocket connection (${e.reason}), reopening ...`)
      setTimeout(this._setupWebsocket.bind(this), 1000)
    }
  }
}
