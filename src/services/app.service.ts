import axios from "axios";

class AppService {

    public static host_uri: string = `${process.env.HOST || 'http://localhost:8080'}`;

    /**
     * Method to connect to the api in order to:
     * Create a new document and return its unique identifier.
     */
    public static createNewDocument = async (): Promise<string | null> => {

        try {
            const route: string = `${AppService.host_uri}/api/documents`;
            const response = await axios.post(`${route}`);
            return response.data.id;

        } catch (error) { console.log(error); }

        return "";
    };

    /**
     * Retrieve the content of a specific document.
     * @param 
     * 
     * @return 
     */
    public static getDocumentContent = async (uuid: string | null): Promise<string | null> => {
        let result: string | null = null;

        if (uuid !== null) {    
            const response = await axios.get(`${AppService.host_uri}/api/documents`, { params: { id: uuid } });
            result = response.data;
        }
        return result;
    };

    /**
     * Establish a WebSocket connection for real-time
     * collaboration on a document.
     */
    public static establishConnection = () => { };
};

export default AppService;