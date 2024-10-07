import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, Repeat } from 'react-native-feather';

interface MarketData {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const HomeScreen: React.FC = () => {
  const [balance, setBalance] = useState<number>(988234.56);
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();

        if (data && data.length > 0) {
          const newMarketData = data.map((crypto, index) => ({
            rank: index + 1,
            symbol: crypto.symbol.toUpperCase(),
            name: crypto.name,
            price: crypto.current_price,
            change: crypto.price_change_percentage_24h,
          }));
  
          setMarketData(newMarketData);
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    // Initial fetch
    fetchMarketData();

    // Set up interval for periodic updates
    const intervalId = setInterval(fetchMarketData, 30000); // Fetch every 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BSCE</Text>
        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.sectionTitle}>Your Balance</Text>
        <Text style={styles.balanceText}>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <TrendingUp stroke="green" width={24} height={24} />
            <Text style={styles.actionButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <TrendingDown stroke="red" width={24} height={24} />
            <Text style={styles.actionButtonText}>Sell</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Repeat stroke="blue" width={24} height={24} />
            <Text style={styles.actionButtonText}>Trade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <DollarSign stroke="gold" width={24} height={24} />
            <Text style={styles.actionButtonText}>Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.marketOverview}>
        <Text style={styles.sectionTitle}>Market Overview (Top 10)</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderText, styles.rankColumn]}>Rank</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Name</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText, styles.textRight]}>Price</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText, styles.textRight]}>24h Change</Text>
        </View>
        <ScrollView style={styles.tableContent}>
          {marketData.map((market) => (
            <View key={market.symbol} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.rankColumn]}>{market.rank}</Text>
              <View style={styles.nameColumn}>
                <Text style={styles.cryptoName}>{market.name}</Text>
                <Text style={styles.cryptoSymbol}>{market.symbol}</Text>
              </View>
              <Text style={[styles.tableCell, styles.textRight]}>${market.price.toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.textRight, market.change >= 0 ? styles.textGreen : styles.textRed]}>
                {market.change >= 0 ? `+${market.change.toFixed(2)}%` : `${market.change.toFixed(2)}%`}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#357aff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  balanceContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: 4,
  },
  marketOverview: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableContent: {
    maxHeight: 300,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  textRight: {
    textAlign: 'right',
  },
  textGreen: {
    color: 'green',
  },
  textRed: {
    color: 'red',
  },
  rankColumn: {
    flex: 0.5,
  },
  nameColumn: {
    flex: 1.5,
  },
  cryptoName: {
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    color: '#666',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  loginModalButton: {
    backgroundColor: '#357aff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#357aff',
  },
});

export default HomeScreen;