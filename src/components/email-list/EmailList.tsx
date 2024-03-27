import styles from './EmailList.module.scss'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {emailService} from "../../services/email.service.ts";
import parse from 'html-react-parser';
import {CircleX} from "lucide-react";

function EmailList() {
  const {data} = useQuery({
    queryKey: ['email list'],
    queryFn: () => emailService.getEmails()
  })

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationKey: ['delete email'],
    mutationFn: (emailId: string) => emailService.deleteEmail(emailId),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['email list']
      })
    }
  })

  return <div className={styles.list}>
      {data?.map(email => (
          <div key={email.id} className={styles.news}>
            {parse(email.text)}
            <button>
              <CircleX size={16} onClick={() => mutate(email.id)}/>
            </button>
          </div>
        ))}
    </div>
}

export default EmailList;