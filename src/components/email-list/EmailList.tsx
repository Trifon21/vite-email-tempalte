import styles from './EmailList.module.scss'
import {useQuery} from "@tanstack/react-query";
import {emailService} from "../../services/email.service.ts";
import parse from 'html-react-parser';

function EmailList() {
  const {data} = useQuery({
    queryKey: ['email list'],
    queryFn: () => emailService.getEmails()
  })

    return <div className={styles.list}>
      {data?.map(email => (
        <div key={email.text}>
          {parse(email.text)}
        </div>
      ))}
    </div>
}

export default EmailList;