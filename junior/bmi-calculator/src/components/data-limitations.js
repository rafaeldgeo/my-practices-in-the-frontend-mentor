import iconGender from "../images/icon-gender.svg";
import iconAge from "../images/icon-age.svg";
import iconMuscle from "../images/icon-muscle.svg";
import iconPregnancy from "../images/icon-pregnancy.svg";
import iconRace from "../images/icon-race.svg";

export const limitations = [
    {
        id: 0,
        limitation: "gender",
        icon: iconGender,
        title: "Gender",
        text: "The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI."
    },
    {
        id: 1,
        limitation: "age",
        icon: iconAge,
        title: "Age",
        text: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content."
    },
    {
        id: 2,
        limitation: "muscle",
        icon: iconMuscle,
        title: "Muscle",
        text: "BMI may misclassify muscular individuals as overweight or obese, as it doesn' differentiate muscle from fat."   
    },
    {
        id: 3,
        limitation: "pregnancy",
        icon: iconPregnancy,
        title: "Pregnancy",
        text: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child."   
    },
    {
        id: 4,
        limitation: "race",
        icon: iconRace,
        title: "Race",
        text: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse." 
    },
];