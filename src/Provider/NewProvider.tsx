import {StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

type Props = PropsWithChildren & {};

interface INewProviderValue {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const NewProviderWrapper = createContext<INewProviderValue | null>(null);
const NewProvider = ({children}: Props) => {
  const [searchText, setSearchText] = useState('');

  const contextValue: INewProviderValue = useMemo(
    () => ({searchText, setSearchText}),
    [searchText],
  );
  return (
    <NewProviderWrapper.Provider value={contextValue}>
      {children}
    </NewProviderWrapper.Provider>
  );
};

export default NewProvider;

export const useNewContext = () => {
  const context = React.useContext(NewProviderWrapper);
  if (!context) {
    throw new Error('useNewContext must be used within a NewProvider');
  }
  return context;
};
