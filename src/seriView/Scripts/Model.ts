interface LogEntry {
    id: number;
    message: string;
    level: string;
    timestamp: string;
    exception: string;
    properties: string;
}

interface LogProperty {
    key: string;
}

interface LogPropertySimple extends LogProperty {
    value: string;
}

interface LogPropertyComplex extends LogProperty {
    type: string;
    properties: LogProperty[];
}

interface LogProperties {
    properties: LogProperty[];
}