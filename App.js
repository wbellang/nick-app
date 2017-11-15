import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ListView } from 'react-native';

import data from './clubs.json';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      isLoading: false,
      title: data.name,
      dataSource: ds.cloneWithRows(data.clubs.sort((a, b) => a.name.localeCompare(b.name)))
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size={'small'}
            style={{ margin: 15 }} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.state.title}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.text}>{rowData.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    paddingTop: 5,
    marginLeft: 12,
    fontSize: 16,
  },
});
