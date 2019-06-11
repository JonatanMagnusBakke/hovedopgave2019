

export default class ApiInfo {

    static myInstance = null;

    _userID = "";
    _ip = "192.168.0.11";
    _port="11008";


    /**
     * @returns {ApiInfo}
     */
    static getInstance() {
        if (ApiInfo.myInstance == null) {
            ApiInfo.myInstance = new ApiInfo();
        }

        return this.myInstance;
    }

    getUserID() {
        return this._userID;
    }

    setUserID(id) {
        this._userID = id;
    }

    getIp(){
        return this._ip;
    }

    setIp(newIp){
        this._ip = newIp;
    }

    getPort(){
        return this._port;
    }

    setPort(newPort){
        this._port = newPort
    }
}