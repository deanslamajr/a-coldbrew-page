import { MutationResolvers } from '../../types/loginAccount.graphqls';
import { ContextInterface } from '../../context';

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['logoutAccount']> = async (_parent, _args, context, _info) => {
  context.session.logout();

  return {
    wasLogoutSuccess: true,
  };
};
