// components/UserPersistenceWrapper.tsx
'use client'

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {useStore} from "@/store/useStore";

const UserPersistenceWrapper = ({ children }: { children: React.ReactNode }) => {
    const { userStore } = useStore();
    useEffect(() => {
        // Call persistence on mount to ensure user data is loaded
        userStore.persistence();
    }, []);

    return <>{children}</>;
};

export default observer(UserPersistenceWrapper);
