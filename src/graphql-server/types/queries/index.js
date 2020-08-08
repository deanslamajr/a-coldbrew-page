import root from './root.graphqls';
import getAccountFromSession from './getAccountFromSession.graphqls';
import getChores from './getChores.graphqls';

export const typeDefs = [root, getAccountFromSession, getChores];
