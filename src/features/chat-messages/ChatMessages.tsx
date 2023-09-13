import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import {useQuery, useSubscription} from '@apollo/client'
import {useLocalStorage} from '@shared/lib/useLocalStorage'
import {NEW_MESSAGE} from '@shared/schemas/messages/subscriptions'
import {toTime} from '@shared/utils/timeHelpers'
import './ChatMessages.scss'
import {GetAllMessagesByRoomIdDocument} from '@shared/lib/types/__generated-types__/graphql'
import {IUser} from 'src/entities/messages/Messages'
import apxR from '@assets/Chat/apx-r.svg'
import apxL from '@assets/Chat/apx-l.svg'

interface IChatMessages {
    groupId: number
}

interface IMessage {
    userId: number
    id: number
    content: string
    createdAt: string
}

export const ChatMessages = ({groupId}: IChatMessages) => {
    const {lsValue} = useLocalStorage<IUser>('user')
    const [groupMessages, setGroupMessages] = useState<IMessage[] | undefined>(undefined)
    const ref = useRef<HTMLDivElement>(null)
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)

    const {data: subData, loading: subLoading, error} = useSubscription(NEW_MESSAGE, {variables: {roomId: groupId}})

    const {data: messagesData, loading: messagesLoading} = useQuery(GetAllMessagesByRoomIdDocument, {
        variables: {
            userMessage: {
                roomId: groupId,
            },
        },
    })

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth',
            })
            setAutoScrollEnabled(false)
        }
    }, [groupMessages])

    useEffect(() => {
        if (!subLoading) {
            const newMessage = subData?.newMessage
            if (newMessage) {
                setGroupMessages((prevMessages) => {
                    if (prevMessages && Array.isArray(prevMessages)) {
                        return [...prevMessages, newMessage]
                    } else {
                        return [newMessage]
                    }
                })
            }
        }
    }, [subData, subLoading])

    useEffect(() => {
        if (ref.current && autoScrollEnabled) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
            })
            setAutoScrollEnabled(false)
        }
    }, [autoScrollEnabled])

    useEffect(() => {
        if (!messagesLoading) {
            setGroupMessages(messagesData?.getAllMessagesByRoomId)
            setAutoScrollEnabled(true)
        }
    }, [messagesData])

    const MessageItem = ({message}: { message: IMessage }) => {
        return (
            <div className={`chat__message ${message.userId === lsValue?.id ? 'your' : 'answer'}`}>
                <div className="content">
                    {message.content}
                    <div className="time">
                        {toTime(message.createdAt)}
                    </div>
                    <div className='apx'>
                        {message.userId === lsValue?.id ? <img src={apxR} alt=""/>  : <img src={apxL} alt=""/>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {messagesLoading ? <div>Loading...</div> :
                <>
                    {groupMessages && (
                        <div className="chat__messages messages" ref={ref}>
                            {groupMessages.map((message) =>
                                <MessageItem key={message.id} message={message}/>
                            )}
                        </div>
                    )}</>
            }
        </>
    )
}


