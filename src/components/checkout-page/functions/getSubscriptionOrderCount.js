import moment from "moment";


const isRestaurantOpen = (restaurantSchedule,dayNumber, selectedTime)=>{
    let isOpen = false
    if(restaurantSchedule?.length>0){
        restaurantSchedule?.forEach(rest=> {
            if(rest?.day===dayNumber){
                const startTime = moment(rest?.opening_time, 'HH:mm:ss')
                const endTime = moment(rest?.closing_time, 'HH:mm:ss')
                const currentTime = moment(selectedTime,'HH:mm:ss' )
                isOpen= moment(currentTime).isBetween(startTime, endTime)
            }
        })
    }
    return isOpen
}
export const getSubscriptionOrderCount = (restaurantSchedule, type, startDate, endDate,days)=>{
    let start_date = moment(startDate);
    let end_date = moment(endDate);
    let startingDate = start_date;
    let count =0
    let dayCount = 0
    if(type==='daily') {
        while(startingDate <= end_date) {
            const dayNumber = moment(startingDate).day()
            if(isRestaurantOpen(restaurantSchedule,dayNumber,days[0]?.time )){
                count++
            }
            dayCount++
            startingDate.add(1, 'days');
        }
    }
    else if(type==='weekly'){
        let totalDays = []
        while(startingDate <= end_date) {
            const dayNumber = moment(startingDate).day()
            if(dayCount<=6){
                if(days.length>0){
                    days.forEach(item=> {
                        if(item?.day===dayNumber){
                            totalDays.push(dayNumber)
                        }
                    })
                }
                dayCount++
            }
            else{
                dayCount = 0
            }
            startingDate.add(1, 'days');
        }
        if(totalDays.length>0){
            totalDays.forEach(day=>{
                if(isRestaurantOpen(restaurantSchedule,day,days.find(item=> item.day===day)?.time )){
                    count++
                }
            })
        }
    }
    else if(type==='monthly'){
        while(startingDate <= end_date) {
            const dayNumber = moment(startingDate).day()
            const dayNumberFromMonth = moment(startingDate).format('D')
            if(days.length>0){
                days.forEach(item=>{
                    if(Number.parseInt(item?.day)===Number.parseInt(dayNumberFromMonth)){
                        if(isRestaurantOpen(restaurantSchedule,dayNumber,item?.time )){
                            count++
                        }
                    }
                })
            }
            dayCount++
            startingDate.add(1, 'days');
        }
    }
    return count

}