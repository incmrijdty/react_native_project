import { Text, TextInput } from "react-native"
import { Picker } from "@react-native-picker/picker"

import { ui } from "../styles/uiStyles"
import { currencies } from "@/constants/currencies"

type Props = {
    title: string,
    setTitle: (value: string) => void;

    amount: string;
    setAmount: (value: string) => void;

    category: string;
    setCategory: (value: string) => void;

    currency: string;
    setCurrency: (value: string) => void;

    image: string | null;
    setImage: (value: string | null) => void;
}

export default function ExpenseForm({
    title, setTitle, amount, setAmount, category, 
    setCategory, currency, setCurrency, image, setImage
} : Props) {
    return (
        <>
            <Text style={ui.subtitle}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                placeholderTextColor="#777"
                style={ui.input}
            />

            <Text style={ui.subtitle}>Amount</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="#777"
                style={ui.input}
            />

            <Text style={ui.subtitle}>Currency</Text>
            <Picker
                selectedValue={currency}
                onValueChange={setCurrency}
            >
                {currencies.map((item) => (
                    <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>

            <Text style={ui.subtitle}>Category</Text>
            <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="Enter category"
                placeholderTextColor="#777"
                style={ui.input}
            />
        </>
    )
}