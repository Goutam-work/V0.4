var con = require('../connection');

exports.getArena = (sports_id,book_date,locality) => {
    var column_name_1 = '1';
    var code_var_1 = '1';
    var column_name_2 = '1';
    var code_var_2 = '1';
    if(locality > 0){
        column_name_1 = 'ad.locality_id';
        code_var_1 = locality;
    }
    if(sports_id > 0){
        column_name_2 = "slm.sports_id";
        code_var_2 = sports_id;
    }
    var qry = `SELECT DISTINCT
                    sl.location_id,
                    sl.ground_name,
                    lt.locality_name,
                    ad.lane_name,
                    ad.pin,ad.city,
                    ad.state_name 
                FROM sports_location AS sl 
                    INNER JOIN address AS ad ON sl.address_id = ad.address_id 
                    INNER JOIN locality AS lt ON ad.locality_id = lt.locality_id 
                    INNER JOIN sports_location_mapping AS slm ON sl.location_id = slm.location_id 
                WHERE ${column_name_1}=? 
                    AND ${column_name_2}=?`;
    return new Promise ( (resolve, reject) => {
        con.query(qry,[code_var_1,code_var_2],(err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    })
  }

  exports.getCourts = (sports_id,arena_id) => {
    var code_var_1 = '1';
    var column_name_2 = '1';
    var code_var_2 = '1';
    if(arena_id > 0){
        code_var_1 = arena_id;
    }
    if(sports_id > 0){
        column_name_2 = "slm.sports_id";
        code_var_2 = sports_id;
    }
    var qry = `SELECT
                    cd.court_id,
                    cd.court_name,
                    sp.sports_name,
                    slm.sports_id,
                    sl.location_id
                FROM court_details AS cd 
                    INNER JOIN sports_location_mapping AS slm ON slm.field_sports_id = cd.field_sports_id 
                    INNER JOIN sports_location AS sl ON sl.location_id = slm.location_id 
                    INNER JOIN sports AS sp ON sp.sports_id = slm.sports_id 
                WHERE slm.location_id=? 
                    AND ${column_name_2}=?
                ORDER BY slm.sports_id`;
    return new Promise ( (resolve, reject) => {
        con.query(qry,[code_var_1,code_var_2],(err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    })
  }

  exports.getSportsArena = (arena_id) => {
    var code_var_1 = '1';
    if(arena_id > 0){
        code_var_1 = arena_id;
    }
    var qry = `SELECT
                    sp.sports_name,
                    slm.sports_id
                FROM sports_location_mapping AS slm 
                    INNER JOIN sports AS sp ON sp.sports_id = slm.sports_id 
                WHERE slm.location_id=? 
                ORDER BY slm.sports_id`;
    return new Promise ( (resolve, reject) => {
        con.query(qry,[code_var_1],(err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    })
  }

  exports.getCourtSlots = (court_id,book_date) => {
    var code_var_1 = '1';
    var code_var_2 = book_date;
    datetime = new Date();
    if(court_id > 0){
        code_var_1 = court_id;
    }
    if(book_date == undefined){
        code_var_2 = datetime.toISOString().slice(0,10);
    }
    var qry = `SELECT
                    crt.court_id,
                    slt.slot_id,
                    slt.slot_start_time,
                    slt.slot_end_time,
                    slty.type_name,
                    slty.slot_cost,
                    CASE WHEN sa.availability IS NULL THEN 1
                        WHEN sa.availability = 0 THEN 0
                        END AS availability,
                    CASE WHEN gb.booking_status_id = 2 THEN 0
                        WHEN gb.booking_status_id IS NULL THEN 0
                        ELSE 1
                    END AS booking_status
                FROM court_details AS crt 
                INNER JOIN court_slot_type_mapping AS sltypm ON sltypm.court_id = crt.court_id
                INNER JOIN slot_type AS slty ON slty.slot_type_id = sltypm.slot_type_id
                INNER JOIN slot AS slt ON slt.slot_type_id = slty.slot_type_id
                LEFT JOIN slot_availability AS sa ON slt.slot_id = sa.slot_id
                            AND sa.court_id = ?
                            AND sa.start_date < ?
                            AND sa.end_date > ?
                LEFT JOIN slot_booking_mapping AS sbm ON sbm.slot_id = slt.slot_id
                LEFT JOIN ground_bookings AS gb ON sbm.booking_id = gb.booking_id
                            AND gb.booking_date = ?
                WHERE crt.court_id = ?
                ORDER BY slt.slot_start_time`;
    return new Promise ( (resolve, reject) => {
        con.query(qry,[code_var_1,code_var_2,code_var_2,code_var_2,code_var_1],(err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    })
  }