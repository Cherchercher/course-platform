export const dict = function (factory, origin) {
    return new Proxy({ ...origin }, {
        get(dict, key) {
            // Ensure that "missed" keys are set into
            // The dictionary with default values
            if (!dict.hasOwnProperty(key)) {
                dict[key] = factory()
            }

            return dict[key]
        }
    })
}