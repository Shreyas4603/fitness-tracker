trigger='''
DELIMITER //
CREATE TRIGGER make_profile_on_signup
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO profile (userId, name, email)
    VALUES (NEW.userId, NEW.userName, NEW.email)
    ON DUPLICATE KEY UPDATE name = NEW.userName, email = NEW.email;
END; //

CREATE TRIGGER update_profile_achievements_after_insert_exercise
AFTER INSERT ON exercises
FOR EACH ROW
BEGIN
    UPDATE profile
    SET total_achievements = (
            SELECT COUNT(*)
            FROM exercises
            WHERE userId = NEW.userId AND achievement = 1
        ) + (
            SELECT COUNT(*)
            FROM workouts
            WHERE userId = NEW.userId AND achievement = 1
        )
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_achievements_after_insert_workout
AFTER INSERT ON workouts
FOR EACH ROW
BEGIN
    UPDATE profile
    SET total_achievements = (
            SELECT COUNT(*)
            FROM exercises
            WHERE userId = NEW.userId AND achievement = 1
        ) + (
            SELECT COUNT(*)
            FROM workouts
            WHERE userId = NEW.userId AND achievement = 1
        )
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_achievements_after_update_workout
AFTER UPDATE ON workouts
FOR EACH ROW
BEGIN
    UPDATE profile
    SET total_achievements = (
            SELECT COUNT(*)
            FROM exercises
            WHERE userId = NEW.userId AND achievement = 1
        ) + (
            SELECT COUNT(*)
            FROM workouts
            WHERE userId = NEW.userId AND achievement = 1
        )
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_achievements_after_update_exercise
AFTER UPDATE ON exercises
FOR EACH ROW
BEGIN
    UPDATE profile
    SET total_achievements = (
            SELECT COUNT(*)
            FROM exercises
            WHERE userId = NEW.userId AND achievement = 1
        ) + (
            SELECT COUNT(*)
            FROM workouts
            WHERE userId = NEW.userId AND achievement = 1
        )
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_height 
AFTER INSERT ON parameters 
FOR EACH ROW 
BEGIN
    UPDATE profile 
    SET latest_height = NEW.height
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_weight 
AFTER INSERT ON parameters 
FOR EACH ROW 
BEGIN
    UPDATE profile 
    SET latest_weight = NEW.weight
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_parameters_height
AFTER UPDATE ON parameters 
FOR EACH ROW 
BEGIN
    UPDATE profile 
    SET latest_height = NEW.height
    WHERE userId = NEW.userId;
END; //

CREATE TRIGGER update_profile_parameters_weight
AFTER UPDATE ON parameters 
FOR EACH ROW 
BEGIN
    UPDATE profile 
    SET latest_weight = NEW.weight
    WHERE userId = NEW.userId;
END; //
DELIMITER ;
'''


delete_triggers='''
DROP TRIGGER IF EXISTS make_profile_on_signup;
DROP TRIGGER IF EXISTS update_profile_achievements_after_insert_exercise;
DROP TRIGGER IF EXISTS update_profile_achievements_after_insert_workout;
DROP TRIGGER IF EXISTS update_profile_achievements_after_update_workout;
DROP TRIGGER IF EXISTS update_profile_achievements_after_update_exercise;
DROP TRIGGER IF EXISTS update_profile_height;
DROP TRIGGER IF EXISTS update_profile_weight;
'''