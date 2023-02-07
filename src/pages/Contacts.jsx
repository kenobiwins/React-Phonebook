import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { PhonebookForm } from 'components/PhonebookForm/PhonebookForm';
import { useState } from 'react';

export const Contacts = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  const handleRedirect = event => {
    setTabIndex(0);
  };

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxW="md"
      mr="auto"
      ml="auto"
      p={3}
    >
      <Tabs
        mt="16px"
        p="20px"
        variant="enclosed"
        w={'100%'}
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab p={4} _selected={{ color: 'white', bg: 'orange.400' }}>
            Add contact
          </Tab>
          <Tab p={4} _selected={{ color: 'white', bg: 'orange.400' }}>
            All contacts
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PhonebookForm />
          </TabPanel>
          <TabPanel>
            <Filter />
            <ContactsList redirect={handleRedirect} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
