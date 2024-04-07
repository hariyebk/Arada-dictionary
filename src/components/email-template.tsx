

interface EmailTemplateProps {
    firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({firstName,}) => (
    <div>
        <h1>, {firstName}!</h1>
    </div>
);
