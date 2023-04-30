export enum SocketEventOperation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export const buildSocketEvent = (type: SocketEventOperation, data: any) => {
  return {
    type,
    data,
  };
};
