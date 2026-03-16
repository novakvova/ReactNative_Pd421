import {Image} from 'expo-image';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {HelloWave} from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Link} from 'expo-router';
import {useEffect, useState} from "react";
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {useGetCategoriesQuery} from "@/store/apis/categoryApi";
import {IMAGES_URL} from "@/constants/urls";

export default function HomeScreen() {
    const {data, isLoading} = useGetCategoriesQuery()

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <Text className="font-medium text-sky-500">WELCOME FGKSKGKSDGGS KSDFGKGSKGSK GHJSDGJKSKGSJKG</Text>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m',
                            web: 'F12',
                        })}
                    </ThemedText>{' '}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Link href="/modal">
                    <Link.Trigger>
                        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                    </Link.Trigger>
                    <Link.Preview/>
                    <Link.Menu>
                        <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')}/>
                        <Link.MenuAction
                            title="Share"
                            icon="square.and.arrow.up"
                            onPress={() => alert('Share pressed')}
                        />
                        <Link.Menu title="More" icon="ellipsis">
                            <Link.MenuAction
                                title="Delete"
                                icon="trash"
                                destructive
                                onPress={() => alert('Delete pressed')}
                            />
                        </Link.Menu>
                    </Link.Menu>
                </Link>

                <ThemedText>
                    {`Tap the Explore tab to learn more about what's included in this starter app.`}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                <ThemedText>
                    {`When you're ready, run `}
                    <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                    <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                    <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>

            <ThemedView className="px-5 pt-5 flex-row flex-wrap justify-between">
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    data?.map((category: ICategoryResponse) => (

                        <View
                            key={category.id}
                            className="bg-white dark:bg-neutral-900 rounded-2xl shadow w-[48%] mb-4 overflow-hidden"
                        >
                            <Image
                                source={{ uri: IMAGES_URL + `/${category.image}` }}
                                contentFit="cover"
                                style={{ width: '100%', height: 128 }}
                                onError={(e) => console.log('Image error:', e)}
                            />

                            <View className="p-3">
                                <Text className="font-bold text-base dark:text-white">
                                    {category.name}
                                </Text>
                                <Text className="text-gray-500 text-sm mt-1" numberOfLines={3}>
                                    {category.description}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ThemedView>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
