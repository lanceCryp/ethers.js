function _inspectString(value, done) {
    if (Array.isArray(value)) {
        return "[" + value.map((v) => _inspect(v, done)).join(", ") + "]";
    }
    switch (typeof (value)) {
        case "bigint":
            return value.toString() + "n";
        case "boolean":
        case "number":
        case "string":
            return JSON.stringify(value);
        case "symbol":
            return `[Symbol ${String(value)}]`;
        case "object":
            if (value == null) {
                return "null";
            }
            return "{ " + Object.keys(value).map((key) => {
                return `${key}=${_inspect(value[key], done)}`;
            }).join(", ") + " }";
    }
    return `[ unknown type: ${value} ]`;
}
function _inspect(value, done) {
    console.log("DEBUG-1", value);
    if (done.has(value)) {
        return "[ Circular ]";
    }
    done.add(value);
    const result = _inspectString(value, done);
    console.log("DEBUG-2", result);
    done.delete(value);
    return result;
}
export function inspect(value) {
    return _inspect(value, new Set());
}
//# sourceMappingURL=utils-debug.js.map