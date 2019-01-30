interface IOauth {
    "ahs-agent": string,
    "access-token"?: string
}

class Oauth {
    public ahsAgent = "";
    public accessToken = "";
    public accessTokenExpire = 0
    constructor() {
        this.ahsAgent = window.location.pathname.split('/')[1];
    }
    public getHeader(): IOauth {
        if (this.accessToken === "") {
            return {
                "ahs-agent": this.ahsAgent
            }
        } else {
            return {
                "ahs-agent": this.ahsAgent,
                "access-token": this.accessToken
            }
        }
    }
}

export default new Oauth();