interface LogEntry {
    id: number;
    message: string;
    level: string;
    timestamp: string;
    properties: string;
}

interface LogProperty {
    key: string;
    value: string;
}