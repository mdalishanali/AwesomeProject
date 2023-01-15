import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default function NoteScreen() {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const list: any = [];
      await firestore()
        .collection('notes')
        .where('user._id', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc: any) => {
            if (doc.exists) {
              doc.data().createdAt = doc.data().createdAt.toDate();
              list.push(doc.data());
            }
          });
        });
      if (loading) {
        setLoading(false);
      }
      setMessages(list);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('notes')
      .add({
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {});
  }, []);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          renderBubble={renderBubble}
          renderSend={renderSend}
          alwaysShowSend={true}
          scrollToBottomComponent={scrollToBottomComponent}
          user={{
            _id: user.uid,
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
