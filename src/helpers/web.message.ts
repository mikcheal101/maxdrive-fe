/**
 * Interface or abstract representation of the message over the wire
 */

interface WebMessage {
    id: string;
    sender?: string;
    timestamp?: Date;
    message: string;
    type: string;
};

export default WebMessage;