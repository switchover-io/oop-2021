const fetchPromise = jest.fn().mockReturnValue(Promise.resolve(true));

const fetchAsyncFn = jest.fn().mockImplementation(() => ({ promise: fetchPromise }));

export const valueTrueFn = jest.fn().mockImplementation(() => ( true ));


export class Client {
    toggleValue = valueTrueFn
    fetchAsync = fetchAsyncFn
}

module.exports = {
    createClient: function (...args: any[]) {
        return new Client();
    }
}
