// Global object to store current settings
let currentSettings = {};
let currentFileName = 'PalWorldSettings.ini';

// Default PalWorldSettings.ini values and descriptions
const defaultSettings = {
    "Difficulty": {
        "displayName": "Game Difficulty",
        "defaultValue": "None",
        "description": "Sets the game difficulty. Options: None, Easy, Normal, Hard.",
        "type": "string",
        "options": ["None", "Easy", "Normal", "Hard"]
    },
    "DayTimeSpeedRate": {
        "displayName": "Day Time Speed Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the speed of the day cycle.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "NightTimeSpeedRate": {
        "displayName": "Night Time Speed Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the speed of the night cycle.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "ExpRate": {
        "displayName": "Experience Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the experience gain rate.",
        "type": "number",
        "min": 0.1, "max": 20.0, "step": 0.1
    },
    "PalCaptureRate": {
        "displayName": "Pal Capture Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the Pal capture success rate.",
        "type": "number",
        "min": 0.5, "max": 2.0, "step": 0.05
    },
    "PalSpawnNumRate": {
        "displayName": "Pal Spawn Number Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the number of Pals that spawn.",
        "type": "number",
        "min": 0.5, "max": 3.0, "step": 0.1
    },
    "PalDamageRateAttack": {
        "displayName": "Pal Damage Rate (Attack)",
        "defaultValue": 1.0,
        "description": "Adjusts damage dealt by Pals.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PalDamageRateDefense": {
        "displayName": "Pal Damage Rate (Defense)",
        "defaultValue": 1.0,
        "description": "Adjusts damage taken by Pals.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PlayerDamageRateAttack": {
        "displayName": "Player Damage Rate (Attack)",
        "defaultValue": 1.0,
        "description": "Adjusts damage dealt by players.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PlayerDamageRateDefense": {
        "displayName": "Player Damage Rate (Defense)",
        "defaultValue": 1.0,
        "description": "Adjusts damage taken by players.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PlayerStaminaDecreaceRate": {
        "displayName": "Player Stamina Decrease Rate",
        "defaultValue": 1.0,
        "description": "Adjusts player stamina decrease rate.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PlayerAutoHPRegeneRate": {
        "displayName": "Player Auto HP Regen Rate",
        "defaultValue": 1.0,
        "description": "Adjusts player HP regeneration rate.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PlayerAutoHpRegeneRateInSleep": {
        "displayName": "Player HP Regen Rate (Sleep)",
        "defaultValue": 1.0,
        "description": "Adjusts player HP regeneration rate while sleeping.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PalStaminaDecreaceRate": {
        "displayName": "Pal Stamina Decrease Rate",
        "defaultValue": 1.0,
        "description": "Adjusts Pal stamina decrease rate.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PalAutoHPRegeneRate": {
        "displayName": "Pal Auto HP Regen Rate",
        "defaultValue": 1.0,
        "description": "Adjusts Pal HP regeneration rate.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "PalAutoHpRegeneRateInSleep": {
        "displayName": "Pal HP Regen Rate (Sleep)",
        "defaultValue": 1.0,
        "description": "Adjusts Pal HP regeneration rate while sleeping.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "BuildObjectDamageRate": {
        "displayName": "Build Object Damage Rate",
        "defaultValue": 1.0,
        "description": "Adjusts damage dealt to player-built structures.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "BuildObjectDeteriorationDamageRate": {
        "displayName": "Build Object Deterioration Damage Rate",
        "defaultValue": 1.0,
        "description": "Adjusts deterioration damage to player-built structures.",
        "type": "number",
        "min": 0.0, "max": 10.0, "step": 0.1
    },
    "CollectionDropRate": {
        "displayName": "Collection Drop Rate",
        "defaultValue": 1.0,
        "description": "Adjusts item drop rate from gathering.",
        "type": "number",
        "min": 0.5, "max": 5.0, "step": 0.1
    },
    "CollectionObjectHpRate": {
        "displayName": "Collection Object HP Rate",
        "defaultValue": 1.0,
        "description": "Adjusts HP of gatherable objects (trees, rocks).",
        "type": "number",
        "min": 0.5, "max": 3.0, "step": 0.1
    },
    "CollectionObjectRespawnSpeedRate": {
        "displayName": "Collection Object Respawn Speed Rate",
        "defaultValue": 1.0,
        "description": "Adjusts respawn speed of gatherable objects.",
        "type": "number",
        "min": 0.5, "max": 3.0, "step": 0.1
    },
    "EnemyDropItemRate": {
        "displayName": "Enemy Drop Item Rate",
        "defaultValue": 1.0,
        "description": "Adjusts item drop rate from enemies.",
        "type": "number",
        "min": 0.5, "max": 5.0, "step": 0.1
    },
    "DeathPenalty": {
        "displayName": "Death Penalty",
        "defaultValue": "All",
        "description": "Sets the death penalty. Options: All, Item, ItemAndEquipment, None.",
        "type": "string",
        "options": ["All", "Item", "ItemAndEquipment", "None"]
    },
    "bEnablePlayerToPlayerDamage": {
        "displayName": "Enable Player to Player Damage (PvP)",
        "defaultValue": false,
        "description": "Enables or disables player-to-player damage (PvP).",
        "type": "boolean"
    },
    "bEnableFriendlyFireDamage": {
        "displayName": "Enable Friendly Fire Damage",
        "defaultValue": false,
        "description": "Enables or disables friendly fire damage (player to Pal, Pal to Pal).",
        "type": "boolean"
    },
    "bEnableInvaderEnemy": {
        "displayName": "Enable Invader Enemy",
        "defaultValue": true,
        "description": "Enables or disables enemy invasions at bases.",
        "type": "boolean"
    },
    "bActiveUNKO": {
        "displayName": "Activate UNKO (Debug/Specific)",
        "defaultValue": false,
        "description": "Enables or disables 'UNKO' (likely a debug or specific feature).",
        "type": "boolean"
    },
    "bEnableAimAssistPad": {
        "displayName": "Enable Aim Assist (Controller)",
        "defaultValue": true,
        "description": "Enables or disables aim assist for controllers.",
        "type": "boolean"
    },
    "bEnableAimAssistKeyboard": {
        "displayName": "Enable Aim Assist (Keyboard)",
        "defaultValue": false,
        "description": "Enables or disables aim assist for keyboard/mouse.",
        "type": "boolean"
    },
    "DropItemMaxNum": {
        "displayName": "Max Dropped Items",
        "defaultValue": 3000,
        "description": "Maximum number of items that can be dropped on the ground.",
        "type": "number",
        "min": 100, "max": 10000, "step": 100
    },
    "DropItemMaxHPRate": {
        "displayName": "Dropped Item Max HP Rate",
        "defaultValue": 1.0,
        "description": "Maximum HP rate for dropped items (how much HP they have before despawning).",
        "type": "number",
        "min": 0.1, "max": 1.0, "step": 0.05
    },
    "bAutoResetGuildNoOnlinePlayers": {
        "displayName": "Auto Reset Guild (No Online Players)",
        "defaultValue": false,
        "description": "Automatically resets guild if no players are online.",
        "type": "boolean"
    },
    "bCanPickupOtherPlayerDroppedPalContainers": {
        "displayName": "Allow Pickup of Other Player's Pal Containers",
        "defaultValue": false,
        "description": "Allows picking up other players' dropped Pal containers.",
        "type": "boolean"
    },
    "bEnableNonLoginPenalty": {
        "displayName": "Enable Non-Login Penalty",
        "defaultValue": true,
        "description": "Enables or disables penalties for not logging in (e.g., base deterioration).",
        "type": "boolean"
    },
    "bEnableFastTravel": {
        "displayName": "Enable Fast Travel",
        "defaultValue": true,
        "description": "Enables or disables fast travel.",
        "type": "boolean"
    },
    "bIsStartLocationSelectByMap": {
        "displayName": "Enable Start Location Select by Map",
        "defaultValue": true,
        "description": "Enables or disables starting location selection on the map.",
        "type": "boolean"
    },
    "bExistPlayerAfterLogout": {
        "displayName": "Player Exists After Logout",
        "defaultValue": false,
        "description": "Keeps player character in world after logout.",
        "type": "boolean"
    },
    "bEnableDefenseOtherPalOnAttack": {
        "displayName": "Enable Pal Defense of Other Pals",
        "defaultValue": false,
        "description": "Enables or disables Pals defending other Pals when attacked.",
        "type": "boolean"
    },
    "CoopPlayerMaxNum": {
        "displayName": "Co-op Player Max Number",
        "defaultValue": 4,
        "description": "Maximum number of players in co-op mode.",
        "type": "number",
        "min": 2, "max": 10, "step": 1
    },
    "ServerPlayerMaxNum": {
        "displayName": "Server Player Max Number",
        "defaultValue": 32,
        "description": "Maximum number of players on a dedicated server.",
        "type": "number",
        "min": 4, "max": 64, "step": 1
    },
    "ServerName": {
        "displayName": "Server Name",
        "defaultValue": "Default Palworld Server",
        "description": "Name of the dedicated server.",
        "type": "string"
    },
    "ServerDescription": {
        "displayName": "Server Description",
        "defaultValue": "A Palworld server.",
        "description": "Description of the dedicated server.",
        "type": "string"
    },
    "AdminPassword": {
        "displayName": "Admin Password",
        "defaultValue": "",
        "description": "Password for server administration.",
        "type": "string",
        "secret": true // Indicate this should be a password field
    },
    "PublicPort": {
        "displayName": "Public Port",
        "defaultValue": 8211,
        "description": "Public port for the server.",
        "type": "number",
        "min": 1024, "max": 65535, "step": 1
    },
    "PublicIP": {
        "displayName": "Public IP",
        "defaultValue": "",
        "description": "Public IP address of the server.",
        "type": "string"
    },
    "RCONEnabled": {
        "displayName": "RCON Enabled",
        "defaultValue": false,
        "description": "Enables or disables RCON (Remote Console) for server management.",
        "type": "boolean"
    },
    "RCONPort": {
        "displayName": "RCON Port",
        "defaultValue": 25575,
        "description": "Port for RCON.",
        "type": "number",
        "min": 1024, "max": 65535, "step": 1
    },
    "bUseUPnP": {
        "displayName": "Use UPnP",
        "defaultValue": false,
        "description": "Enables or disables UPnP for automatic port forwarding.",
        "type": "boolean"
    },
    "bIsPublicServer": {
        "displayName": "Is Public Server",
        "defaultValue": false,
        "description": "Makes the server publicly visible in the server list.",
        "type": "boolean"
    },
    "bCanHostLocalOnly": {
        "displayName": "Can Host Local Only",
        "defaultValue": false,
        "description": "Restricts server hosting to local network only.",
        "type": "boolean"
    },
    "BaseCampMaxNum": {
        "displayName": "Base Camp Max Number",
        "defaultValue": 128,
        "description": "Maximum number of base camps allowed.",
        "type": "number",
        "min": 1, "max": 256, "step": 1
    },
    "BaseCampWorkerMaxNum": {
        "displayName": "Base Camp Worker Max Number",
        "defaultValue": 15,
        "description": "Maximum number of workers per base camp.",
        "type": "number",
        "min": 1, "max": 20, "step": 1
    },
    "DropItemAliveMaxHours": {
        "displayName": "Dropped Item Alive Max Hours",
        "defaultValue": 1.0,
        "description": "How long dropped items remain before despawning (in hours).",
        "type": "number",
        "min": 0.1, "max": 24.0, "step": 0.1
    },
    "bForceRespawnContainer": {
        "displayName": "Force Respawn Container",
        "defaultValue": false,
        "description": "Forces containers to respawn.",
        "type": "boolean"
    },
    "bForceRespawnPickupItem": {
        "displayName": "Force Respawn Pickup Item",
        "defaultValue": false,
        "description": "Forces pickup items to respawn.",
        "type": "boolean"
    },
    "bForceRespawnBuildObject": {
        "displayName": "Force Respawn Build Object",
        "defaultValue": false,
        "description": "Forces built objects to respawn.",
        "type": "boolean"
    },
    "bForceRespawnMapObject": {
        "displayName": "Force Respawn Map Object",
        "defaultValue": false,
        "description": "Forces map objects (e.g., resources) to respawn.",
        "type": "boolean"
    },
    "bForceRespawnPal": {
        "displayName": "Force Respawn Pal",
        "defaultValue": false,
        "description": "Forces Pals to respawn.",
        "type": "boolean"
    },
    "bUseFixedDayTime": {
        "displayName": "Use Fixed Day Time",
        "defaultValue": false,
        "description": "Fixes the time of day.",
        "type": "boolean"
    },
    "FixedDayTime": {
        "displayName": "Fixed Day Time",
        "defaultValue": 0.0,
        "description": "Fixed time of day (0.0 to 24.0).",
        "type": "number",
        "min": 0.0, "max": 24.0, "step": 0.1
    },
    "GuildPlayerMaxNum": {
        "displayName": "Guild Player Max Number",
        "defaultValue": 20,
        "description": "Maximum number of players in a guild.",
        "type": "number",
        "min": 1, "max": 50, "step": 1
    },
    "PalEggDefaultHatchingTime": {
        "displayName": "Pal Egg Default Hatching Time",
        "defaultValue": 72.0,
        "description": "Default time for Pal eggs to hatch (in hours).",
        "type": "number",
        "min": 0.0, "max": 720.0, "step": 1.0
    },
    "WorkSpeedRate": {
        "displayName": "Work Speed Rate",
        "defaultValue": 1.0,
        "description": "Adjusts the work speed of Pals.",
        "type": "number",
        "min": 0.1, "max": 5.0, "step": 0.1
    },
    "bIsMultiplay": {
        "displayName": "Is Multiplayer",
        "defaultValue": false,
        "description": "Enables or disables multiplayer.",
        "type": "boolean"
    },
    "bIsPVP": {
        "displayName": "Is PvP",
        "defaultValue": false,
        "description": "Enables or disables PvP on the server.",
        "type": "boolean"
    },
    "bCanAttackOtherPal": {
        "displayName": "Can Attack Other Pal",
        "defaultValue": false,
        "description": "Allows players to attack other players' Pals.",
        "type": "boolean"
    },
    "bCanAttackOtherPlayer": {
        "displayName": "Can Attack Other Player",
        "defaultValue": false,
        "description": "Allows players to attack other players.",
        "type": "boolean"
    },
    "bUseDefaultSaveData": {
        "displayName": "Use Default Save Data",
        "defaultValue": false,
        "description": "Uses default save data (for new games).",
        "type": "boolean"
    },
    "bEnableDebugMenu": {
        "displayName": "Enable Debug Menu",
        "defaultValue": false,
        "description": "Enables or disables the debug menu.",
        "type": "boolean"
    },
    "bEnableCheats": {
        "displayName": "Enable Cheats",
        "defaultValue": false,
        "description": "Enables or disables cheats.",
        "type": "boolean"
    },
    "bEnablePlayerLogout": {
        "displayName": "Enable Player Logout",
        "defaultValue": true,
        "description": "Enables or disables player logout.",
        "type": "boolean"
    },
    "bEnablePlayerBuildRestriction": {
        "displayName": "Enable Player Build Restriction",
        "defaultValue": false,
        "description": "Enables or disables build restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerBaseRestriction": {
        "displayName": "Enable Player Base Restriction",
        "defaultValue": false,
        "description": "Enables or disables base restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerInventoryRestriction": {
        "displayName": "Enable Player Inventory Restriction",
        "defaultValue": false,
        "description": "Enables or disables inventory restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerEquipRestriction": {
        "displayName": "Enable Player Equip Restriction",
        "defaultValue": false,
        "description": "Enables or disables equipment restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerSkillRestriction": {
        "displayName": "Enable Player Skill Restriction",
        "defaultValue": false,
        "description": "Enables or disables skill restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerStatusRestriction": {
        "displayName": "Enable Player Status Restriction",
        "defaultValue": false,
        "description": "Enables or disables status restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerLevelRestriction": {
        "displayName": "Enable Player Level Restriction",
        "defaultValue": false,
        "description": "Enables or disables level restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildRestriction": {
        "displayName": "Enable Player Guild Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerPalRestriction": {
        "displayName": "Enable Player Pal Restriction",
        "defaultValue": false,
        "description": "Enables or disables Pal restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerItemRestriction": {
        "displayName": "Enable Player Item Restriction",
        "defaultValue": false,
        "description": "Enables or disables item restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerWeaponRestriction": {
        "displayName": "Enable Player Weapon Restriction",
        "defaultValue": false,
        "description": "Enables or disables weapon restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerArmorRestriction": {
        "displayName": "Enable Player Armor Restriction",
        "defaultValue": false,
        "description": "Enables or disables armor restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerAccessoryRestriction": {
        "displayName": "Enable Player Accessory Restriction",
        "defaultValue": false,
        "description": "Enables or disables accessory restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerFoodRestriction": {
        "displayName": "Enable Player Food Restriction",
        "defaultValue": false,
        "description": "Enables or disables food restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerMedicineRestriction": {
        "displayName": "Enable Player Medicine Restriction",
        "defaultValue": false,
        "description": "Enables or disables medicine restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerCraftRestriction": {
        "displayName": "Enable Player Craft Restriction",
        "defaultValue": false,
        "description": "Enables or disables crafting restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerTechnologyRestriction": {
        "displayName": "Enable Player Technology Restriction",
        "defaultValue": false,
        "description": "Enables or disables technology restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerMapRestriction": {
        "displayName": "Enable Player Map Restriction",
        "defaultValue": false,
        "description": "Enables or disables map restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerFastTravelRestriction": {
        "displayName": "Enable Player Fast Travel Restriction",
        "defaultValue": false,
        "description": "Enables or disables fast travel restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerRespawnRestriction": {
        "displayName": "Enable Player Respawn Restriction",
        "defaultValue": false,
        "description": "Enables or disables respawn restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerDeathPenaltyRestriction": {
        "displayName": "Enable Player Death Penalty Restriction",
        "defaultValue": false,
        "description": "Enables or disables death penalty restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildJoinRestriction": {
        "displayName": "Enable Player Guild Join Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild join restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildLeaveRestriction": {
        "displayName": "Enable Player Guild Leave Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild leave restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildKickRestriction": {
        "displayName": "Enable Player Guild Kick Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild kick restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildPromoteRestriction": {
        "displayName": "Enable Player Guild Promote Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild promote restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildDemoteRestriction": {
        "displayName": "Enable Player Guild Demote Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild demote restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildDisbandRestriction": {
        "displayName": "Enable Player Guild Disband Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild disband restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildRenameRestriction": {
        "displayName": "Enable Player Guild Rename Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild rename restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildInviteRestriction": {
        "displayName": "Enable Player Guild Invite Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild invite restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildChatRestriction": {
        "displayName": "Enable Player Guild Chat Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild chat restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildMemberRestriction": {
        "displayName": "Enable Player Guild Member Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild member restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildBaseRestriction": {
        "displayName": "Enable Player Guild Base Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild base restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildPalRestriction": {
        "displayName": "Enable Player Guild Pal Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild Pal restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildItemRestriction": {
        "displayName": "Enable Player Guild Item Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild item restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildWeaponRestriction": {
        "displayName": "Enable Player Guild Weapon Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild weapon restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildArmorRestriction": {
        "displayName": "Enable Player Guild Armor Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild armor restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildAccessoryRestriction": {
        "displayName": "Enable Player Guild Accessory Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild accessory restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildFoodRestriction": {
        "displayName": "Enable Player Guild Food Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild food restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildMedicineRestriction": {
        "displayName": "Enable Player Guild Medicine Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild medicine restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildCraftRestriction": {
        "displayName": "Enable Player Guild Craft Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild crafting restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildTechnologyRestriction": {
        "displayName": "Enable Player Guild Technology Restriction",
        "defaultValue": false,
        "description": "Enables or disables technology restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildMapRestriction": {
        "displayName": "Enable Player Guild Map Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild map restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildFastTravelRestriction": {
        "displayName": "Enable Player Guild Fast Travel Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild fast travel restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildRespawnRestriction": {
        "displayName": "Enable Player Guild Respawn Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild respawn restrictions for players.",
        "type": "boolean"
    },
    "bEnablePlayerGuildDeathPenaltyRestriction": {
        "displayName": "Enable Player Guild Death Penalty Restriction",
        "defaultValue": false,
        "description": "Enables or disables guild death penalty restrictions for players.",
        "type": "boolean"
    }
};

// Function to show a custom message modal
function showMessageModal(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex'; // Use flex to center
}

// Function to close the custom message modal
function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

function parseIniContent(iniContent) {
    const parsed = {};
    const lines = iniContent.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip empty lines and comments
        if (!trimmedLine || trimmedLine.startsWith(';') || trimmedLine.startsWith('#')) continue;

        // Find the OptionSettings block
        if (trimmedLine.startsWith('OptionSettings=(') && trimmedLine.endsWith(')')) {
            const content = trimmedLine.slice('OptionSettings=('.length, -1); // remove 'OptionSettings=(' prefix and ')' suffix
            const entries = content.split(',').map(pair => pair.trim());

            for (const entry of entries) {
                const [key, value] = entry.split('=');
                if (key && value !== undefined) {
                    parsed[key.trim()] = value.trim();
                }
            }

            break; // Only process the first OptionSettings line
        }
    }

    return parsed;
}

// Function to generate .ini content from an object
function generateIniContent(settings) {
    let iniContent = '[/Script/Pal.PalGameWorldSettings]\n'; // Fixed section for PalWorld
    for (const key in settings) {
        if (settings.hasOwnProperty(key)) {
            let value = settings[key];
            // Handle boolean values
            if (typeof value === 'boolean') {
                value = value ? 'True' : 'False';
            }
            // Handle string values that might need quotes
            if (typeof value === 'string' && (value.includes(' ') || value.length === 0)) {
                value = `"${value}"`;
            }
            iniContent += `${key}=${value}\n`;
        }
    }
    return iniContent;
}

function generateIniContentToSaveOrClipboard(settings) {
    let iniContent = '[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(';
    const entries = [];

    for (const key in settings) {
        if (settings.hasOwnProperty(key)) {
            let value = settings[key];

            // Convert booleans to Unreal-style True/False
            if (typeof value === 'boolean') {
                value = value ? 'True' : 'False';
            }

            // Quote string values with spaces or empty strings
            if (typeof value === 'string' && (value.includes(' ') || value.length === 0)) {
                value = `"${value}"`;
            }

            entries.push(`${key}=${value}`);
        }
    }

    iniContent += entries.join(',');
    return iniContent + ')\n\n; Made with PalWorldSettingsEditor -- By CosmicOofMan (cosmicoofman.github.io/PalWorldSettingsEditor)';
}

// Function to render settings in the UI
function renderSettings(settingsData) {
    const settingsGrid = document.getElementById('settingsGrid');
    settingsGrid.innerHTML = ''; // Clear previous settings

    // Merge loaded settings with default settings to ensure all fields are present
    // and use loaded values if available, otherwise default values.
    const mergedSettings = {};
    for (const key in defaultSettings) {
        mergedSettings[key] = { ...defaultSettings[key] };
        if (settingsData.hasOwnProperty(key)) {
            let loadedValue = settingsData[key];

            // Try to convert loaded string values to their correct types
            if (mergedSettings[key].type === 'boolean') {
                // If loadedValue is already a boolean (from default creation), use it directly.
                // If it's a string (from file loading), convert it.
                if (typeof loadedValue === 'boolean') {
                    mergedSettings[key].currentValue = loadedValue;
                } else if (typeof loadedValue === 'string') {
                    mergedSettings[key].currentValue = (loadedValue.toLowerCase() === 'true');
                } else {
                    // Fallback if type is unexpected, use default
                    mergedSettings[key].currentValue = mergedSettings[key].defaultValue;
                }
            } else if (mergedSettings[key].type === 'number') {
                mergedSettings[key].currentValue = parseFloat(loadedValue);
            } else {
                // Remove quotes from string values if present
                if (typeof loadedValue === 'string' && loadedValue.startsWith('"') && loadedValue.endsWith('"')) {
                    loadedValue = loadedValue.substring(1, loadedValue.length - 1);
                }
                mergedSettings[key].currentValue = loadedValue;
            }
        } else {
            mergedSettings[key].currentValue = mergedSettings[key].defaultValue;
        }
        // Initialize the 'newValue' to the 'currentValue'
        mergedSettings[key].newValue = mergedSettings[key].currentValue;
    }

    currentSettings = mergedSettings; // Update global settings object

    for (const key in currentSettings) {
        const setting = currentSettings[key];
        const settingCard = document.createElement('div');
        settingCard.className = 'bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700';

        const settingName = document.createElement('h3');
        settingName.className = 'text-xl font-semibold mb-1 text-blue-200'; // Adjusted margin
        settingName.textContent = setting.displayName || key.replace(/([A-Z])/g, ' $1').trim(); // Use displayName or format key

        const iniKeyDisplay = document.createElement('p');
        iniKeyDisplay.className = 'text-gray-500 text-xs mb-4'; // Smaller, darker text
        iniKeyDisplay.textContent = `(${key})`;

        settingCard.appendChild(settingName);
        settingCard.appendChild(iniKeyDisplay); // Add the actual key underneath

        const currentValueDisplay = document.createElement('p');
        currentValueDisplay.className = 'text-gray-300 mb-2';
        currentValueDisplay.innerHTML = `<strong>Old Value:</strong> <span id="current-${key}">${setting.currentValue}</span>`;
        settingCard.appendChild(currentValueDisplay);

        const label = document.createElement('label');
        label.htmlFor = `input-${key}`;
        label.className = 'block text-sm font-medium text-gray-300 mb-1';
        label.textContent = 'New Value:';
        settingCard.appendChild(label);

        let inputElement;
        if (setting.type === 'boolean') {
            inputElement = document.createElement('select');
            inputElement.id = `input-${key}`;
            inputElement.className = 'w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500';
            const optionTrue = document.createElement('option');
            optionTrue.value = 'True';
            optionTrue.textContent = 'True';
            const optionFalse = document.createElement('option');
            optionFalse.value = 'False';
            optionFalse.textContent = 'False';
            inputElement.appendChild(optionTrue);
            inputElement.appendChild(optionFalse);
            // Set selected based on current value
            inputElement.value = setting.currentValue ? 'True' : 'False';
        } else if (setting.type === 'number') {
            inputElement = document.createElement('input');
            inputElement.type = 'number';
            inputElement.id = `input-${key}`;
            inputElement.className = 'w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500';
            inputElement.value = setting.currentValue;
            if (setting.min !== undefined) inputElement.min = setting.min;
            if (setting.max !== undefined) inputElement.max = setting.max;
            if (setting.step !== undefined) inputElement.step = setting.step;
        } else if (setting.type === 'string' && setting.options) {
            inputElement = document.createElement('select');
            inputElement.id = `input-${key}`;
            inputElement.className = 'w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500';
            setting.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                inputElement.appendChild(opt);
            });
            inputElement.value = setting.currentValue;
        }
        else {
            inputElement = document.createElement('input');
            inputElement.type = setting.secret ? 'password' : 'text'; // Use password type for secret fields
            inputElement.id = `input-${key}`;
            inputElement.className = 'w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500';
            inputElement.value = setting.currentValue;
        }

        inputElement.addEventListener('input', (event) => {
            let value = event.target.value;
            if (setting.type === 'boolean') {
                setting.newValue = (value === 'True');
            } else if (setting.type === 'number') {
                setting.newValue = parseFloat(value);
            } else {
                setting.newValue = value;
            }
            updateIniPreview(); // Update preview on input change
        });
        settingCard.appendChild(inputElement);
        settingsGrid.appendChild(settingCard);
    }

    document.getElementById('settingsEditor').classList.remove('hidden');
    document.getElementById('iniPreviewSection').classList.remove('hidden'); // Show preview section
    document.getElementById('saveFileBtn').disabled = false;
    updateIniPreview(); // Initial update of the preview
}

// Function to update the INI file preview textarea
function updateIniPreview() {
    const iniOutputTextarea = document.getElementById('iniOutput');
    const settingsToPreview = {};
    for (const key in currentSettings) {
        const setting = currentSettings[key];
        settingsToPreview[key] = setting.newValue !== undefined ? setting.newValue : setting.currentValue;
    }
    iniOutputTextarea.value = generateIniContent(settingsToPreview);
}

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        currentFileName = file.name;
        document.getElementById('fileNameDisplay').textContent = `Loaded: ${currentFileName}`;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const iniContent = e.target.result;
                const parsedData = parseIniContent(iniContent);
                renderSettings(parsedData);
                showMessageModal('File loaded successfully! You can now edit the settings.');
            } catch (error) {
                console.error("Error parsing INI file:", error);
                showMessageModal('Error: Could not parse the .ini file. Please ensure it is a valid PalWorldSettings.ini file.');
            }
        };
        reader.onerror = () => {
            showMessageModal('Error reading file.');
        };
        reader.readAsText(file);
    }
});

// Event listener for Create New Default File button
document.getElementById('createDefaultBtn').addEventListener('click', () => {
    currentFileName = 'PalWorldSettings.ini'; // Reset to default name
    document.getElementById('fileNameDisplay').textContent = `New file: ${currentFileName}`;
    const initialSettings = {};
    for (const key in defaultSettings) {
        initialSettings[key] = defaultSettings[key].defaultValue;
    }
    renderSettings(initialSettings);
    showMessageModal('New default settings loaded! You can now edit and save.');
});

// Event listener for Save File button
document.getElementById('saveFileBtn').addEventListener('click', () => {
    if (Object.keys(currentSettings).length === 0) {
        showMessageModal('No settings to save. Please load a file or create a new one first.');
        return;
    }

    const settingsToSave = {};
    for (const key in currentSettings) {
        const setting = currentSettings[key];
        // Use newValue if it exists and is different, otherwise use currentValue
        // This ensures that if a field wasn't touched, its original value is used.
        // However, the input event listener already updates newValue, so newValue will always reflect the latest.
        settingsToSave[key] = setting.newValue !== undefined ? setting.newValue : setting.currentValue;
    }

    const iniContent = generateIniContentToSaveOrClipboard(settingsToSave);
    const blob = new Blob([iniContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = currentFileName; // Use the current file name or default
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showMessageModal(`File "${currentFileName}" saved successfully!`);
});

// Event listener for Copy to Clipboard button
document.getElementById('copyIniBtn').addEventListener('click', () => {
    const iniOutputTextarea = document.getElementById('iniOutput');
    iniOutputTextarea.select();
    document.execCommand('copy'); // Use execCommand for broader compatibility in iframes
    showMessageModal('INI content copied to clipboard!');
});

// Initial state: hide editor and disable save button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('settingsEditor').classList.add('hidden');
    document.getElementById('iniPreviewSection').classList.add('hidden'); // Hide preview section initially
    document.getElementById('saveFileBtn').disabled = true;
});

// Toggles between light and dark mode.
function toggleTheme() {
 if (document.documentElement.classList.contains("dark")) {
   document.documentElement.classList.remove("dark");
   localStorage.setItem("theme", "light");
 } else {
   document.documentElement.classList.add("dark");
   localStorage.setItem("theme", "dark");
 }
}

// Applies the saved theme on page load.
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    // If theme is explicitly saved, use that. Otherwise, check system preference.
    if (
        savedTheme === "dark" ||
        (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
        themeToggle.checked = true; // Check toggle for dark mode
    } else {
        document.documentElement.classList.remove("dark");
        themeToggle.checked = false; // Uncheck toggle for light mode
    }
}

// Add event listeners
themeToggle.addEventListener("change", toggleTheme);

// Initial setup when the page loads
window.onload = function () {
    applySavedTheme();
    handleCalculateBtnClick();
    populateExamplesTable();
};