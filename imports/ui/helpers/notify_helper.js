import noty from 'noty'

export default class Notify {
  static failure = message => noty({
    text: message,
    type: 'error',
    timeout: 3000,
    progressBar: true,
    animation: {
      open: 'animated fadeInDown',
      close: 'animated fadeOutUp',
      speed: 200
    }
  })

  static success = message => noty({
    text: message,
    type: 'success',
    timeout: 3000,
    progressBar: true,
    animation: {
      open: 'animated fadeInDown',
      close: 'animated fadeOutUp',
      speed: 200
    }
  })
}
