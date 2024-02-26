export default class notificationText {

  constructor() {
    this.type = {
      Friend_Request: { defaultMessage: "connection_request" },
      Bill_Request: { defaultMessage: "bill request" }
    };
  }

  getType(type) {
    const status = this.type[type]
    console.log('status', status)
    return {
      message: status.defaultMessage || type || 'Not Any type',
    };
  }

  requestSendTitle(name) {
    const senderUsername = name || 'User';
    return `You received a friend request from ${senderUsername}.`;
  }
  requestSendBody(name) {
    return `Hey ${name}, you have a new friend request! Check it out and connect.`;
  }

  billRequestBody(name) {
    return ` ${name}, sent you a bill.`;
  }

}
