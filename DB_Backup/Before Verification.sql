PGDMP                      |         
   LabXplorer    16.3    16.3 <    5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    16564 
   LabXplorer    DATABASE     �   CREATE DATABASE "LabXplorer" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "LabXplorer";
                postgres    false            �            1259    16754    capsule_simulations    TABLE     q   CREATE TABLE public.capsule_simulations (
    capsule_id integer NOT NULL,
    simulation_id integer NOT NULL
);
 '   DROP TABLE public.capsule_simulations;
       public         heap    postgres    false            �            1259    16597    capsules    TABLE     �  CREATE TABLE public.capsules (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    thumbnail character varying(255),
    images text[],
    pdf character varying(255),
    category character varying(50),
    author_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.capsules;
       public         heap    postgres    false            �            1259    16596    capsules_id_seq    SEQUENCE     �   CREATE SEQUENCE public.capsules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.capsules_id_seq;
       public          postgres    false    218            9           0    0    capsules_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.capsules_id_seq OWNED BY public.capsules.id;
          public          postgres    false    217            �            1259    16770    comments    TABLE     -  CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    capsule_id integer NOT NULL,
    user_id integer NOT NULL,
    comment_text text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16769    comments_comment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.comments_comment_id_seq;
       public          postgres    false    227            :           0    0    comments_comment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;
          public          postgres    false    226            �            1259    16643    options    TABLE     �   CREATE TABLE public.options (
    id integer NOT NULL,
    quiz_id integer,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false NOT NULL
);
    DROP TABLE public.options;
       public         heap    postgres    false            �            1259    16642    options_id_seq    SEQUENCE     �   CREATE SEQUENCE public.options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.options_id_seq;
       public          postgres    false    224            ;           0    0    options_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;
          public          postgres    false    223            �            1259    16631    quizzes    TABLE     |   CREATE TABLE public.quizzes (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    capsule_id integer
);
    DROP TABLE public.quizzes;
       public         heap    postgres    false            �            1259    16630    quizzes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.quizzes_id_seq;
       public          postgres    false    222            <           0    0    quizzes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;
          public          postgres    false    221            �            1259    16622    simulations    TABLE     �   CREATE TABLE public.simulations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    link character varying(255),
    category character varying(100)
);
    DROP TABLE public.simulations;
       public         heap    postgres    false            �            1259    16621    simulations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.simulations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.simulations_id_seq;
       public          postgres    false    220            =           0    0    simulations_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.simulations_id_seq OWNED BY public.simulations.id;
          public          postgres    false    219            �            1259    16566    users    TABLE     7  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16565    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            >           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            p           2604    16600    capsules id    DEFAULT     j   ALTER TABLE ONLY public.capsules ALTER COLUMN id SET DEFAULT nextval('public.capsules_id_seq'::regclass);
 :   ALTER TABLE public.capsules ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            w           2604    16773    comments comment_id    DEFAULT     z   ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);
 B   ALTER TABLE public.comments ALTER COLUMN comment_id DROP DEFAULT;
       public          postgres    false    227    226    227            u           2604    16646 
   options id    DEFAULT     h   ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);
 9   ALTER TABLE public.options ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            t           2604    16634 
   quizzes id    DEFAULT     h   ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);
 9   ALTER TABLE public.quizzes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            s           2604    16625    simulations id    DEFAULT     p   ALTER TABLE ONLY public.simulations ALTER COLUMN id SET DEFAULT nextval('public.simulations_id_seq'::regclass);
 =   ALTER TABLE public.simulations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            m           2604    16569    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            0          0    16754    capsule_simulations 
   TABLE DATA           H   COPY public.capsule_simulations (capsule_id, simulation_id) FROM stdin;
    public          postgres    false    225   F       )          0    16597    capsules 
   TABLE DATA           �   COPY public.capsules (id, title, description, content, thumbnail, images, pdf, category, author_id, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �F       2          0    16770    comments 
   TABLE DATA           i   COPY public.comments (comment_id, capsule_id, user_id, comment_text, created_at, updated_at) FROM stdin;
    public          postgres    false    227   �Y       /          0    16643    options 
   TABLE DATA           G   COPY public.options (id, quiz_id, option_text, is_correct) FROM stdin;
    public          postgres    false    224   BZ       -          0    16631    quizzes 
   TABLE DATA           8   COPY public.quizzes (id, title, capsule_id) FROM stdin;
    public          postgres    false    222   �\       +          0    16622    simulations 
   TABLE DATA           L   COPY public.simulations (id, name, description, link, category) FROM stdin;
    public          postgres    false    220   �]       '          0    16566    users 
   TABLE DATA           V   COPY public.users (id, username, email, password, created_at, updated_at) FROM stdin;
    public          postgres    false    216   �^       ?           0    0    capsules_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.capsules_id_seq', 24, true);
          public          postgres    false    217            @           0    0    comments_comment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.comments_comment_id_seq', 13, true);
          public          postgres    false    226            A           0    0    options_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.options_id_seq', 49, true);
          public          postgres    false    223            B           0    0    quizzes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.quizzes_id_seq', 14, true);
          public          postgres    false    221            C           0    0    simulations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.simulations_id_seq', 9, true);
          public          postgres    false    219            D           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 20, true);
          public          postgres    false    215            �           2606    16758 ,   capsule_simulations capsule_simulations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.capsule_simulations
    ADD CONSTRAINT capsule_simulations_pkey PRIMARY KEY (capsule_id, simulation_id);
 V   ALTER TABLE ONLY public.capsule_simulations DROP CONSTRAINT capsule_simulations_pkey;
       public            postgres    false    225    225            �           2606    16606    capsules capsules_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.capsules
    ADD CONSTRAINT capsules_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.capsules DROP CONSTRAINT capsules_pkey;
       public            postgres    false    218            �           2606    16779    comments comments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    227            �           2606    16651    options options_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.options DROP CONSTRAINT options_pkey;
       public            postgres    false    224            �           2606    16636    quizzes quizzes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_pkey;
       public            postgres    false    222            �           2606    16629    simulations simulations_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.simulations
    ADD CONSTRAINT simulations_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.simulations DROP CONSTRAINT simulations_pkey;
       public            postgres    false    220            {           2606    16794    users unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email;
       public            postgres    false    216            }           2606    16792    users unique_username 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_username;
       public            postgres    false    216                       2606    16579    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    16575    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    16577    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            �           2606    16759 7   capsule_simulations capsule_simulations_capsule_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.capsule_simulations
    ADD CONSTRAINT capsule_simulations_capsule_id_fkey FOREIGN KEY (capsule_id) REFERENCES public.capsules(id) ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.capsule_simulations DROP CONSTRAINT capsule_simulations_capsule_id_fkey;
       public          postgres    false    4741    225    218            �           2606    16764 :   capsule_simulations capsule_simulations_simulation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.capsule_simulations
    ADD CONSTRAINT capsule_simulations_simulation_id_fkey FOREIGN KEY (simulation_id) REFERENCES public.simulations(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.capsule_simulations DROP CONSTRAINT capsule_simulations_simulation_id_fkey;
       public          postgres    false    220    225    4743            �           2606    16607     capsules capsules_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.capsules
    ADD CONSTRAINT capsules_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.capsules DROP CONSTRAINT capsules_author_id_fkey;
       public          postgres    false    218    216    4737            �           2606    16780    comments fk_capsule    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_capsule FOREIGN KEY (capsule_id) REFERENCES public.capsules(id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.comments DROP CONSTRAINT fk_capsule;
       public          postgres    false    218    4741    227            �           2606    16785    comments fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT fk_user;
       public          postgres    false    216    4737    227            �           2606    16652    options options_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.options DROP CONSTRAINT options_quiz_id_fkey;
       public          postgres    false    4745    224    222            �           2606    16637    quizzes quizzes_capsule_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_capsule_id_fkey FOREIGN KEY (capsule_id) REFERENCES public.capsules(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_capsule_id_fkey;
       public          postgres    false    4741    222    218            0      x������ � �      )      x��[[o�H�~V~EM�A�XE�d+� N���<��L�a2�ȒXm��f��Ս��`^X����_��9UE����b�["���;�9U}4�>���V�A�J��������3}#s��Uy�e*R�/j�PbnJ�T3�[��"��x23�2y<f>W��B�RG����gb�dU����Q����W��Q�o�Pī\f:�r��U�Y�����H\V"2�'��Pe��5)���U"r��»��-�Q�Z�2U.h3z!Od���);<)�n�@ܪ�b�T�K�t���*�{fQ�,�����d�ӕ���2gmueEi���7-7�T����"��JTnaa��V��'{��'��Ӷ��|�>������J�/�>Ss�k2Փ=�ѩ��'ы�QJ���iu�6��t�kC�U�l�B��ְ�VW�yO��Y�`��֒q,�u��2��j(2��Ni�XA��5]x��1,
qʵ#�^T+��ǜ3�I�>Iuc��Tc�G��p����+�ܒ�D�Y	T9D(�YJ��Թ.b�m9(M��Տ������]�#�!Ѵl��1���7V���S,�0ÉO����Ӿmv�*�$Ҝ�ki�ч.,���;e5�����HI�q�6Nq(��|D/�N��H��v�	�:�$)�Nr�'�,�4eP�JAx�V��N%���:��2E'��Y�y�"�jw[����g%ֿ'��C8~2�'tR�L������'��3�P7�ZѪ7
?#�ٯ�U��ԋ�22%B� &��y�e����*��hj+ޯs�_x[�)+��%�7Xmi��6�,/�;�V������RjJ'�Iz��*7��Yj�������Ҋ�����%�����:�Q�!ݾ�9q��+y��/?}�)���aRU���6�iblu:�Y�ٽ�z��2��an G�H6��`��!��\����_g ���O���<֕)��I���u�.��i|49�O&���ri���?��X~�����/������������1��������xt||r|<�������������r5�Qd�wI�-���\\�@���)���`�7�c��o~����UE�pO֝U�$L@f��/挸�,�]F�F��Ε'Ƥ|%���MY^�?X�oJ����D��`���j�`��n5�)<�25"�N#���2�$�P�ӎ��.������G6A�P�5 � �Pu�-�Ne�w�V�k��䊫t()�$�0�$(:���5����eA9]���ȣ9pءcD�V/�)�N�&D�-�58O��Թ��.�]�;UK�ro}� �-�-+��D���z{�4Z�o��ZߐZ�۵��F�,��iC2�O��3h\gd��p�Kn�����ǳ����������6BH,��L�ܺW�n��(v>:Ew[X�J��$6�<U)j� R�΃IM�Hھ����iD���X�@���	�Iƪm��;θ�J�t���d��)�R~COꊀ������j-��s��~����U��>��������0���HMvbW5���'p�Ġu�{F�����r*A�+r��ɳ��".�6�����$���~[�7uZ�"]9S:O���]1[��
F�AvG��NR`����U"��6oC�	,_8���%��T�$�C^�'�N���&��_ӳ��Gq�E>}�tKL�>_�{=%?hz�V���3}K���/Lq���N5��+�|�uD�w��(L�(x	�g�K(���W��x��������g����_�y�w�~WY�ZŖw��u[
�'���eأ�T��M���LH����ĩ⌱� ���z��"���x�ƪ���̶t���\����L �H�:-aI�^g�ԛ�
��&)T^PY�&	h��bL�,#���V��K�6��H=,ڣ�xtn)�=�T޽H��e� ���8��Ɗ�^�j-R"�u�F���@�(R2pg��$��'��X�����׆8u�y��x������?�Ѓ�W�<�����"rܱ�����c��&���$�1Cxa��z ��mĒ5���ɉ͡R��~�]��#Rk]X�է�!�Cd�t��h:%
HͿ��A����M�L'��GURg�\괇��g�D�}�B������'����xz��ַxp���_��"5��`=�4>�7�z��h���&�5��\�6KQ��8�(\�$3�!�Ɍ�5��K�J�-�q����(|�p������b��a��z�M����8r#�~�ֱ�e6�Td*�1f��DL�~�&�7,��6�~r>g���n���o0z/��ovz�^�8;�bKY���h����,a���J|�~Ms�pD��<��HKs�d��\�$у��:54G2Ģ���38� I�`\���Z9����n�
l�ۢ��V�J�ӔP�2J͗��Ì�M0�rg�!	�з<Sb샸�=8�<l!��pfk��%.�����$g�����`
�v2:���?�=:�W0�k�,{�	�����/��e�z8���|v�z�yi�V�O�C�v�LL�N� m��s�h_�+�j�]��@!ɽY�j<j���D��j����;�~�x�?�2��g���O�G'���{�~�������q�3?2%��ڤ��<rp��n�R'�~y���@	��j@N����[YjE�<G���JH�f���!LRuG���h�z@eU�U�M.rC#w���_�N�r�&��Ѯ�eK���;J$�D  EW[Q���nFK�-�8�Y�B���V��x%ZCUކ��-$2%�ֺ�	���d�!$�,#`I�?s.T��A��4����Lk9�SK�Ćtz1�qZ���9��w��x+�;ĚK����ȤD�( :~��X+?>2��w�7�o�!�pM�u��3.�h0��:5�0�ݨU۳�����P%*�w���6%o�2[6UiwH�w^���R��>�� ? �
Ur���9>*
+�I>��e5%�=��a@{�!� �ȶ��,����߻!a��2im�����W�l)�]#�͂��~$�oШ5u����a�Yd��L6a>�1���-=F}}�y�����r����a�B5X w\LM��eOu���'���)PO�Э��<ٰ��L���`qK��ȸ4��բT��B�V5v&G[߽�(9�S����!6��)v+�>�S��H��6�f�=� Oxlcg������BV����"��� �9�D^�0�����U*�L	�5�Ӯ��f��x(J� <����g{� f��tM�f�4�����N��Pw�߸J�����̸��;���(���#��� ��u1�0�GE���h��؍$Jv��1�A�H+�gT@[mX�+�7�;���a�+��R�nΡ"���ʥ��Z�~.�E��,�&�#oꇫW��y&���J���5_�������%�y�eމ�״hO�$��e���h�����yôAjo�^�cy~����4��*u�bl~R9�51=�}MQ�o4�i�U��n����m�K��.`��w�q��.,��+�3oG@nY�}ۮ:Z�WufE���Vkk���.��B�u2��cߎ��N閄���.���Ob��e���ۼU�	�sʛ�'��7e�{�$V�3�2�&ܴ���K��7Lq8b�������>�>�"��gN�����2�j��O ����h����Q��k������+��̚R���Տ��ʵR3�b��I���.����9��x8�ӿP��*=�P�29:�Tz������N�����t|���=<x<8�(J6Ī�_<+K��R��F���0����G�*�|�=[��5�6������)�b�Z@�Jnݑ�u{]�5����%Ik����ǑO:�̨�V���3RH	MGJ��o��ߗ�2�i�{N�[�
k^�e��r�f
��c��j�/�ח�5��ށ?Bz��uRr�w�u=U�fL]V�S��d���R]*�2�M�7�X�{�lu#mM[G�n�{���h������x�|��^�<��y����G d�ol�w3�^޻�e�?t_ͳ�&�:'vs�j���o�n���I�]#���
e��1�@�����X�F��-ˏ�>(�{����~i�|��S��� �  �|C��[�M��'�����\_u��I[Wnb�H�0duǕ
}vI�C}$�HiǩL) ��Nc2wGɆ��	n�, ��˩����Pw��B2>0��lf�M?�GF��Գ�S��lYS.d��$Q�5p����0�(��"��9]$q���0�iX���F[ ��k]]�Q�ق�t�����a�Ї�d��	���M�4��F~�0L����G���	I�,�Z?�t��%M[�a���ױ���7�*i[<�O� �l����<Y���|����;jNT�5HA���X�4�7ՠ���zp�Fl[��W ����C��������f�������
h3�4Ɲ�oʙ��z������w��� �e*�t�.�8|+�����TC'�)a6@��u�o?�1��:U����ft K�e�E�׳��H��m��'�SV�BV���A�H����)c�C��q!�42�َ���2����gtk�ntw �������ٯ��ͫݍ�f���֎u�bү!����X��6ͭi��)���y��o{�3��X;m��7���Up��Z�C�mv�F1�?et����y�>�#M��-ճ���Ҽ�|;���\�Y��vwH݆�ںK�.�:�3+��� I!Z�����ū�I�S���!�h��@>�G�@�U�6��s��u#9���Q��ְг_`���G�V���d�d��m3��.��OO��w�g:}�=��&����|pl�}�B����������×�|=x��ށ�'      2   �   x�}�K�0D��)r�F�`'�	�6H�UJP����@���ݛy�K�ԝǜ���R�c.���N��c�S��c�Dڀ$�17HS���eS�� ެ��^ʜﻴ�Jo�������f�,#�cV)��m!� x�AF4      /   [  x��T]n�@~ޜbP��O[�!�D��TEH���qbj�F��D�G�d��nH@�������3v�"��4>��GO�=<�5��+?I�!V�x�Q�$��$���1�9̽�\��X�u`�U��9A�sK��]@�ZK�CAc�v���f���h!yN9�^#t��⿄����^#d��JK_6��\��2�N�gW�%��4�Z["�����G�7�yN5Y�>p����+���l�?��(�)&,��8_q%������IFoq.˒�T@�A��:'��(�}�V��Կ��'��=�jr�p����]��Jc��~��{�B�{�)�>�=��.�ro��H$�VF��ȅ4f��㦙���!S���WW�t�-:�5���V�7z貀S���<B�=�@���o8�*U�dy�:N5���̉byC+��f|����ZnSV�m�q�����dO�a2؟��$�lw��L�_I�⹜o��H@�-� ���'�?��5�Vv�ק��w�L��@�At[�X-�5Bo�*�1i�}�
k֤e��oX���l��F
�����f�'�'��Hv �_����@�'�����|�Q�
����d2�*D�      -     x�UO�N�0=�_1_��Z��*Q�MH�E��e�L���h�I�;����W��x��/� /�x�Q��Z���L���XIֱg����ܨ{���	0��a=A�p�Ω��\��1{t�酞ѽ�l�i�sh�M-�D�2I"LCtɌ4�����۬ŬYL����3q	y�j���Rm�c���b�cv�	Z�6z��!��fbj�8IS�qC�-���O8�a��B[]�ԣ�O��Xo˄�,�̜BY����qRU������؄      +   �   x����j1E��W�2������b��ǍU�j���}�e�t1݉�8�>2^H�m)�#*g.o�j�i��c`���e��%iNCE3�p*f�ʉ�pp:�J.z�"��.�D=��%B������:���BrbV����ԩ����~��g?�|F�'���ٶEԧ���`��-<~�o�b�8����C>gƘE�L      '   K  x�}S]s�0}�_�C_r�@�'��U�"�(��/(T@Q��_�`�]gg�˹���9'��D���K3!u=׻a�	���#!�u�uJW���F+�����7���"NT��J���%@�u��d�0��P��\/�FF�C�j�-�M��~�{ၬ ?h��ڞ�jno]��y8g+w����e�F���@:�h2�ψ@�
眲J��{!���GA�c��F/���Ep5�`�&Ë_����ޞ����:���U�.|86L����/Mu�!�p�X%<�?ݠ��}�߷�E�������;T]]sfF�i���]�<�G�i�م�xs�9�w�oΰ.������B������Ap�0�n���GYX�s��^/��Q2��Tg���sy��Rg�?-5[z^l��(�X�1Y%��P"���G��{w]��ǳ.��{�[�{-�th�N)���:Қ/̴̈�O��k�\*� ��cmF��j��UǊ�8Ɣh-��I�걺�n�YJ��"�\`�
sy�b��ܬ6�<�i�a�s��w�@�.G���kH��_�AV�
��P�o$���D+�     