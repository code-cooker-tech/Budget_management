import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  ImageBackground,
  Image
} from 'react-native';
import IncomeCard from '../../../components/incomeCard';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { fetchAccountDate } from '../../config/db';

export default function MyIncome() {
  const [account, setAccount] = useState({});
  const [amountVisibility, setAmountVisibility] = useState({ Balance: true });
  const [refreshing, setRefreshing] = useState(false);
  const [myIncome, setMyIncome] = useState([]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const fetchData = async () => {
    const accountData = await fetchAccountDate();
    if (accountData) {
      setAccount(accountData);
      console.log(accountData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (account) {
      setMyIncome([
        {
          type: 'CASH',
          amount: account.Wallet ? formatNumber(account.Wallet) : 'N/A',
          currency: 'ETB',
          icon: <Ionicons name="cash-outline" size={34} />,
          location: 'Wallet',
        },
        {
          type: 'SAVING',
          amount: account.CBE ? formatNumber(account.CBE) : 'N/A',
          currency: 'ETB',
          icon: <MaterialIcons name="account-balance" size={34} />,
          location: 'CBE',
        },
        {
          type: 'BINANCE',
          amount: account.Telegram ? formatNumber(account.Telegram) : 'N/A',
          currency: 'USDT',
          icon: <FontAwesome name="telegram" size={34} />,
          location: 'Telegram',
        },
      ]);
    }
  }, [account]);

  const toggleVisibility = (location) => {
    setAmountVisibility((prev) => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f9e5fc] ">
      <View className="m-6">
              <ImageBackground
                source={require('../../../assets/CBEBG.jpg')}
                className="w-full h-48 justify-center items-center"
                resizeMode="cover"
                imageStyle={{ borderRadius: 20 }}
              >
                <View className="justify-center items-center mt-6">
                  <View className="text-[#ca8b04e1] font-bold text-lg flex flex-row pt-2">
                  <Text className="text-[#ca8b04e1] font-bold text-lg pr-3">
                  <Image source={require('../../../assets/CBELOGO.png')} style={{ width: 50, height: 50, marginBottom: 16, }} resizeMode='cover'/>
                  </Text>
                  <View>
                  <Text className="text-[#ca8b04e1] font-semibold ">Commercial Bank of Ethiopia</Text>
                    <Text className="text-[#d3aa52] italic mb-4">
                    The bank you can always rely on!
                  </Text>
                  </View>
                  </View>

                    <Text className="text-white mb-4">Balance</Text>

                    <View className="flex flex-row">
                    <Text className="text-white font-bold text-3xl text-center">
                      {amountVisibility.Balance
                        ? formatNumber(account.Wallet + account.CBE + account.Telegram)
                        : '*****'}{' '}
                      Br.
                    </Text>
                    
                    <TouchableOpacity
                    onPress={() => toggleVisibility('Balance')}
                    className="flex flex-row mt-1 pl-2"
                  >
                    <Ionicons
                      name={amountVisibility.Balance ? 'eye-off' : 'eye'}
                      size={24}
                      color="white"
                      className=" ml-4"
                    />
                  </TouchableOpacity>
                    </View>

                  <Text className="text-white mb-12">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </ImageBackground>
            </View>
        <ScrollView className="flex-1 bg-white" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View className="px-4">
            {myIncome.map((income, index) => (
              <View key={index} className="mb-6">
                <IncomeCard
                  type={income.type}
                  icon={income.icon}
                  amount={amountVisibility[income.location] ? income.amount : '*****'}
                  currency={income.currency}
                  location={income.location}
                  show={amountVisibility[income.location]}
                  toggleVisibility={toggleVisibility}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
    </>
  );
}
