import { View } from 'react-native'
import React from 'react'
import Screen from '@/componants/screen';
import { IdleMap } from '@/componants/map/Idle-map';

export default function Index() {

    return (
        <Screen isFull={true} StatusBarStyle='default'>
            {/* General map */}
            <View style={{ flex: 1 }}>
                <IdleMap />
            </View>
        </Screen>
    )
};
