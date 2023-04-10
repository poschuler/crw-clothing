export const loggerMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (!action.type) {
      return next();
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.gestState());

    next(action);

    console.log('next state: ', store.getState());
  };
