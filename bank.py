import csv
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

class BankChatbot:
    def __init__(self):
        pass
    def get_user_data_from_csv(self, user_id):
        with open('banking.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['user_id'] == str(user_id):
                    return {
                        'balance': float(row['balance']),
                        'credit_score': int(row['credit_score']),
                        'loan_status': row['loan_amount'],
                        'bill_status': row['bill_status'],
                        'disputed_amount': float(row['disputed_amount'])
                    }

    def check_balance(self, user_data):
        print(user_data)
        balance = user_data['balance']
        if balance < 1000:
            response = "Your balance is low. Are you here for a payment?"
        else:
            response = "Your balance is sufficient. Are you here for a withdrawal?"
        return response

    def check_credit_score(self, user_data):
        credit_score = user_data['credit_score']
        if credit_score < 600:
            response = "Your credit score is low. Consider paying bills on time and reducing debt."
        else:
            response = "Your credit score is high. You may be eligible for credit cards and low-interest loans."
        return response

    def handle_loan_status(self, user_data):
        loan_status = user_data['loan_status']
        if loan_status == 'taken':
            response = "Would you like to make a loan payment or an interest payment?"
        else :
            response = "false"
        return response

    def handle_bill_status(self, user_data):
        bill_status = user_data['bill_status']
        if bill_status == 'pending':
            response = "You have a pending bill. Click [here] to make a payment."
        else :
            response = "false"
        return response

    def handle_disputed_amount(self, user_data):
        disputed_amount = user_data['disputed_amount']
        if disputed_amount > 0:
            response = "There is a disputed amount. Please talk to an agent about the refund and check the status."
        else:
            response = "There are no disputed amounts at the moment."
        return response

    def display_personal_details(self, user_data):
        # Display the user's personal details
        # You can format this based on your database schema
        response = f"Name: {user_data['name']}\nEmail: {user_data['email']}\nPhone: {user_data['phone']}"
        return response

    def start_conversation(self):
        ckpt = 'mrm8488/distilroberta-finetuned-banking77'
        tokenizer = AutoTokenizer.from_pretrained(ckpt)
        model = AutoModelForSequenceClassification.from_pretrained(ckpt)

        print("Bot:", "hellowwwww, whasssuppp")

        user_id = 1234567890  # Assuming user ID is known

        while True:
            user_input = input("You: ")

            if user_input.lower() == 'exit':
                print("Bot: Goodbye!")
                break

            if user_input.lower() == 'hi' or user_input.lower() == 'hello':
                help_message = "You can ask about balance, credit score, loan status, bill status, disputed amount, or personal details."
                print("Bot:", help_message)
                continue

            if 'balance' in user_input.lower():
                user_data = self.get_user_data_from_csv(user_id)
                balance_response = self.check_balance(user_data)
                print("Bot:", balance_response)

            elif 'credit score' in user_input.lower():
                user_data = self.get_user_data_from_csv(user_id)
                credit_score_response = self.check_credit_score(user_data)
                print("Bot:", credit_score_response)

            elif 'loan status' in user_input.lower():
                user_data = self.get_user_data_from_csv(user_id)
                loan_status_response = self.handle_loan_status(user_data)
                print("Bot:", loan_status_response)

            elif 'bill status' in user_input.lower():
                user_data = self.get_user_data_from_csv(user_id)
                bill_status_response = self.handle_bill_status(user_data)
                print("Bot:", bill_status_response)

            elif 'disputed amount' in user_input.lower():
                user_data = self.get_user_data_from_csv(user_id)
                disputed_amount_response = self.handle_disputed_amount(user_data)
                print("Bot:", disputed_amount_response)

            else :
                classifier = pipeline('text-classification', tokenizer=tokenizer, model=model)
                print(classifier(user_input))


if __name__ == "__main__":
    chatbot = BankChatbot()
    chatbot.start_conversation()
