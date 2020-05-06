import { useState, useEffect } from 'react';
import * as serviceWorker from '../../serviceWorker';

const pushNotificationSupported = serviceWorker.isPushNotificationSupported();
export const userPushNotifications = () => {
    const [userConsent, setSuserConsent] = useState(Notification.permission);
    const [userSubscription, setUserSubscription] = useState(null);
    const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pushNotificationSupported) {
          setLoading(true);
          setError(false);
          serviceWorker.register();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(false);
        const getExixtingSubscription = async () => {
          const existingSubscription = await serviceWorker.getUserSubscription();
          setUserSubscription(existingSubscription);
          setLoading(false);
        };
        getExixtingSubscription();
      }, []);

}