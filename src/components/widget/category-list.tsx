import React from 'react';
import { StyleSheet, View } from 'react-native';

import BugIcon from '../icons/bug-icon';
import MessageIcon from '../icons/message-icon';
import type { FeedbackCategory } from '../../core/types';
import CategoryItem from './category-item';

type CategoryListProps = {
  onSelectCategory: (category: FeedbackCategory) => void;
};

const CategoryList = ({ onSelectCategory }: CategoryListProps) => (
  <View style={styles.categoryList}>
    <CategoryItem
      icon={<BugIcon width={20} height={20} color={'#fff'} />}
      color="#F97316"
      title="Report Bug"
      description="Let us know about a specific issue you’re experiencing"
      onSelect={() => onSelectCategory('bug')}
    />
    <CategoryItem
      icon={<MessageIcon width={20} height={20} color={'#fff'} />}
      color="#6366F1"
      title="Something Else"
      description="Share Feedback, Ideas, or anything else"
      onSelect={() => onSelectCategory('other')}
    />
  </View>
);

export default CategoryList;

const styles = StyleSheet.create({
  categoryList: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  categoryListItem: {
    backgroundColor: '#F4F4F5',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 14,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTextContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 4,
  },
  categoryHeadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27272A',
  },
  categoryDescriptionText: {
    fontSize: 16,
    color: '#71717A',
    fontWeight: '500',
  },
});
