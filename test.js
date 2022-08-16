class SamplePromise {
  constructor(executeFunction) {
    this.promiseChaining = [];
    this.handleError = () => {};

    executeFunction(this.resolveFn, this.rejectFn);
  }

  then = (callbackFn) => {
    this.promiseChaining.push(callbackFn);
    return this;
  };

  catch = (errorHandlerFn) => {
    errorHandlerFn = this.handleError;
    return this;
  };

  resolveFn = (value) => {
    const resultValue = value;
    try {
      this.promiseChaining.map((currentFunction) => {
        resultValue = currentFunction(resultValue);
      });
    } catch {
      this.rejectFn(value);
    }
  };

  rejectFn = (err) => {
    this.handleError(err);
  };
}

const promise = new SamplePromise((resolve, reject) => {
  setTimeout(() => {
    const sum = 4 + 5;
    return resolve(sum);
  }, 2000);
});

promise.then((r) => {
  console.log(r);
});
