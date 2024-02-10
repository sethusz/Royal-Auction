import React, { useEffect, useState } from 'react'
import styles from './BestInviters.module.scss'
import InviterUser from '@/entities/partners/ui/partners-statistic/ui/inviter-user/InviterUser'
import avatar from '@assets/Partners/User.svg'
import { useQuery } from '@apollo/client'
import { GET_MY_REFERRALS } from '../../../../../../shared/schemas/user/referals'
import { ReferralUser } from '../../../../../../shared/lib/types/__generated-types__/graphql'
import { useTranslation } from 'react-i18next'

function BestInviters() {
  const { data, loading } = useQuery(GET_MY_REFERRALS)
  const { t } = useTranslation('partnersPage')

    if (!data?.getMyReferrals.length) {
        return null
    }

  return (
    <div className={styles.invites}>
      <h3 className={styles.invites__title}>{t('Inviters leaders')}</h3>
      <div className={styles.invites__users_list}>
        {data &&
          data.getMyReferrals.map((referral) => (
            <InviterUser
              key={referral.id}
              avatar={avatar}
              amount={2}
              name={referral.username}
              subname={referral.email}
            />
          ))}
      </div>
    </div>
  )
}

export default BestInviters
