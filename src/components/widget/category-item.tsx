import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CategoryItemProps = {
  icon: React.ReactElement;
  color: string;
  title: string;
  description: string;
  onSelect: () => void;
};

const CategoryItem = ({
  icon,
  color,
  title,
  description,
  onSelect,
}: CategoryItemProps) => (
  <TouchableOpacity style={styles.categoryListItem} onPress={onSelect}>
    <View style={[styles.categoryIcon, { backgroundColor: color }]}>
      {icon}
    </View>
    <View style={styles.categoryTextContainer}>
      <Text style={styles.categoryHeadingText}>{title}</Text>
      <Text style={styles.categoryDescriptionText}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export default CategoryItem;

const styles = StyleSheet.create({
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
