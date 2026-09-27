import { expect, test } from 'vitest';
import { MISSING_PASSWORD_REQUIREMENTS, validatePassword } from '$lib/signup';

test('Unvalid password: "123"', () => {
	const password: string = '123';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.upperCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.lowerCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters,
		MISSING_PASSWORD_REQUIREMENTS.enoughCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "abc"', () => {
	const password: string = 'abc';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.upperCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.digit,
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters,
		MISSING_PASSWORD_REQUIREMENTS.enoughCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "abc123"', () => {
	const password: string = 'abc123';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.upperCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters,
		MISSING_PASSWORD_REQUIREMENTS.enoughCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "Abc123"', () => {
	const password: string = 'Abc123';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters,
		MISSING_PASSWORD_REQUIREMENTS.enoughCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Valid password: "ABCd-!efg!2"', () => {
	const password: string = 'ABCd-!efg!2';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([]);
	expect(isMissingPasswordRequirements).toEqual(false);
});

test('Valid password: "5mfs#erkWwt"', () => {
	const password: string = '5mfs#erkWwt';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([]);
	expect(isMissingPasswordRequirements).toEqual(false);
});

test('Unvalid password: "5mfserkWwt"', () => {
	const password: string = '5mfserkWwt';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([MISSING_PASSWORD_REQUIREMENTS.specialCharacters]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "5mfserkwt"', () => {
	const password: string = '5mfserkwt';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.upperCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "PASSWORD123"', () => {
	const password: string = 'PASSWORD123';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([
		MISSING_PASSWORD_REQUIREMENTS.lowerCaseLetter,
		MISSING_PASSWORD_REQUIREMENTS.specialCharacters
	]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Valid password: "#LoveYou<3!"', () => {
	const password: string = '#LoveYou<3!';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([]);
	expect(isMissingPasswordRequirements).toEqual(false);
});

test('Unvalid password: "p@ssw0rd"', () => {
	const password: string = 'p@ssw0rd';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([MISSING_PASSWORD_REQUIREMENTS.upperCaseLetter]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "Abc123!"', () => {
	const password: string = 'Abc123!';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([MISSING_PASSWORD_REQUIREMENTS.enoughCharacters]);
	expect(isMissingPasswordRequirements).toEqual(true);
});

test('Unvalid password: "Heipådeg!"', () => {
	const password: string = 'Heipådeg!';
	const missingPasswordRequirements: string[] = [];

	validatePassword(password, missingPasswordRequirements);
	const isMissingPasswordRequirements: boolean =
		password !== '' && missingPasswordRequirements.length > 0;

	expect(missingPasswordRequirements).toEqual([MISSING_PASSWORD_REQUIREMENTS.digit]);
	expect(isMissingPasswordRequirements).toEqual(true);
});
