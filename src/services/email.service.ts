import axios from "axios";
import {IEmail} from "../pages/home/types.ts";

class EmailService{

  private URL = 'http://localhost:3000/emails';

  async getEmails(){
    const {data} = await axios.get<IEmail[]>(this.URL);
    return data;
  }

  async sendEmail(text : string){
    const {data} = await axios.post(this.URL, {
      text
    });
    return data;
  }

  async deleteEmail(emailId: string){
    const {data} = await axios.delete(this.URL + '/' + emailId);
    return data;
  }
}

export  const emailService = new EmailService()