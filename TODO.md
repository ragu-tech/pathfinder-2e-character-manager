The software should support the following actions:

- [ ] Registration
- [ ] Login
- [ ] Create new character
- [ ] List existing characters
- [ ] View existing character
- [ ] Edit existing character
- [ ] Delete existing character

## Character creation
As per manual, character creation happens in steps (p. 21):
1. Create a concept
  a. Ancestry, Background, Class, Details, Faith, Allies  .
2. Start building ability scores
3. Select an ancestry
4. Pick a background
5. Choose a class
6. Determine ability scores
7. Record class details
8. Buy equipment
9. Calculate modifiers
  * Perception
  * Saving throws
  * Melee strikes and ranged strikes
  * Skills
10. Finishing details
  * Alignment
  * Deity
  * Age
  * Gender and pronouns
  * Class DC
  * Hero points
  * Armor class
  * Bulk

The tools should:
* support (with documentation and restricted options) steps 2, 3, 4, 5, 8, and 10, and
* autonomously complete 6, 7, and 9.

## Character leveling up

Leveling up occurs every 1000 XP.
Leveling up checklist, as per manual (p. 31):

1. Increase level by 1 and subtract 1,000 XP from the total XP.
2. Increase maximum Hit Points by the amount specified for the character class.
3. Add class features from the character class advancement table, including ability boosts and skill increases.
4. Select feats as indicated on your class advancement table. Add:
  * ancestry feats,
  * class feats,
  * general feats and skill feats.
5. Add spells and spell slots if this applies to your class.
6. Increase proficiency bonuses by 1 from your new level, and make other increases to your proficiency bonuses as necessary from skill increases or other class features.
  * Increase any other statistics that changed as a result of ability boosts or other abilities.
7. Adjust bonuses from feats and other abilities that are based on your level.