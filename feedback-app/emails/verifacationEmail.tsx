import * as React from 'react';
import { Html, Button, Font, Preview, Section, Row, Heading, Text } from "@react-email/components";
import Head from 'next/head';

interface verificationEmailProps {
    username: string;
    otp: string;
}


export default function VerificationEmail({username, otp}: verificationEmailProps) {
  return (
    <Html lang="en" dir='ltr'>
        <Head>
            <title>Verification Code</title>
            <Font
                fontFamily='Roboto'
                fallbackFontFamily="Verdana"
                fontWeight={400}
                fontStyle='normal'
            />
        </Head>
        <Preview>Here's your verification code: {otp}</Preview>
        <Section>
            <Row>
                <Heading as='h2'>Hello, {username}</Heading>
            </Row>
            <Row>
                <Text>
                    Thank you for regestering. Please use following verification code to complete your regesteration:
                </Text>
            </Row>
            <Row>
                <Text>{otp}</Text>
            </Row>
            <Row>
                <Text>If you have not request this code, please ignore this message.</Text>
            </Row>
        </Section>
      
    </Html>
  );
}